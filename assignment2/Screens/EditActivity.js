import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/Input';
import Datepicker from '../components/Datepicker';
import { useActivities } from '../components/ActivitiesContext';
import { Alert } from 'react-native';
import { colors } from "../StylesHelper";
import { deleteFromDB, writeToDB } from '../firebase-files/firestoreHelper';
import { doc, getDoc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import {database} from "../firebase-files/firebaseSetup"
import moment, { updateLocale } from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';

const EditActivity = ({route,navigation}) => {
    const {documentId} = route.params;
    
    const db = getFirestore();

    const [activity, setActivity] = useState(null);

    const [open, setOpen] = useState(false);
    const [activityName, setActivityName] = useState(null);
    const [items, setItems] = useState([
      {label: 'Walking', value: 'Walking'},
      {label: 'Running', value: 'Running'},
      {label: 'Swimming', value: 'Swimming'},
      {label: 'Weights', value: 'Weights'},
      {label: 'Yoga', value: 'Yoga'},
      {label: 'Cycling', value: 'Cycling'},
      {label: 'Hiking', value: 'Hiking'},
    ]);

    const [duration,setDuration] = useState('')
    const [durationError,setDurationError] = useState(false);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);

    function deleteHandler(deletedId){
      deleteFromDB(deletedId);
      navigation.navigate('All Activities');
    }

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <PressableButton onPressFunction={() => deleteHandler(documentId)}>
          <FontAwesome name="trash-o" size={24} color="white" />
          </PressableButton>
        ),
      });
    }); 

    useEffect(()=>{
      const fetchActivity = async () => {
        const db = getFirestore();
        const docRef = doc(db, "activities", documentId);
        const docSnap = await getDoc(docRef);

        console.log("Document data:", docSnap.data());

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setActivity({ id: docSnap.id, ...docSnap.data() });
            setActivityName(docSnap.data().activityName);
            setDuration(docSnap.data().duration);
            
            const dateStr = docSnap.data().date;
            const parsedDate = moment(dateStr, "ddd, MMM D, YYYY").toDate();

            if (moment(parsedDate).isValid()) {
              setDate(parsedDate);
              setIsDateSelected(true);
            } else {
              console.log("Error: Invalid date format.");
            }
            console.log(docSnap.data().date) 
            setIsDateSelected(true);
            } else {
                console.log("No such document!");
            }
    };
        fetchActivity();
        }, [documentId])

    // validate if the user input is valid and send alerts to user
    function validateInput(){
        if (!activityName) {
            Alert.alert("Validation", "Please select an activity.");
            return false;
        }

        const durationNumber = parseFloat(duration);
        if (isNaN(durationNumber) || durationNumber <= 0) {
            Alert.alert("Validation", "Please enter a valid duration (positive number).");
            return false;     
        }

        if (!isDateSelected) {
            Alert.alert("Validation", "Please select a date.");
            return false;
          }
        return true;

    }

    const handleCancel = () =>{
        navigation.navigate('All Activities');
    }

    // save the user inputs to create a new activity object and save it to the activities array
    const handleSave = async (activityName,duration,date) =>{
        const isValid = validateInput();

        if (isValid){
        const {documentId} = route.params;
        const db = getFirestore();
        const activityRef = doc(db, "activities", documentId);
        
        const isSpecial = activityName=="Running" || activityName == "Weights" || parseInt(duration) > 60;

        const updatedActivity = {
            activityName,
            duration,
            date: date.toLocaleDateString('en-US', {
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
            }),
            isSpecial
        };

       try{
          await updateDoc(activityRef,updatedActivity);
          Alert.alert("Success", "Activity updated successfully");
          setActivityName(null);
          setDuration('')
          setIsDateSelected(false)
          navigation.navigate('All Activities');

       } catch(e){
          console.error("Error updating document: ", error);
       }
      }
    }

  return (
    <View style={styles.container}>
    <View style={styles.chosenAreaContainer}>
      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
      placeholder={activityName}
      open={open}
      value={activityName}
      items={items}
      setOpen={setOpen}
      setValue={setActivityName}
      setItems={setItems}
    />
    <Input style={styles.chosenAreaContainer}
      itemText="Duration (min) *"
      item={duration}
      setItem={setDuration}
      itemError={durationError && 'Please enter a valid duration'}
    />
    <Datepicker 
        date={date}
        setDate={setDate}
        show={show}
        setShow={setShow}
        isDateSelected={isDateSelected}
        setIsDateSelected={setIsDateSelected}
    />
    </View>
    <View style={styles.buttonsContainer}>
      <Button color="red" title="Cancel" onPress={handleCancel}/>
      <Button title="Save" onPress={() =>handleSave(activityName,duration,date)}/>
    </View>
    </View>
  )
}

export default EditActivity

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:"center",
      justifyContent:"space-around",
      
    },
      chosenAreaContainer:{
        width:"85%"
      },
      buttonsContainer: { 
        flexDirection: "row" ,
        justifyContent: 'space-between',
        width:200
    }, 
     label: {
        fontSize: 14, 
        marginBottom: 8, 
        color:colors.primary,
        fontWeight:'bold',
        },
        
        
})