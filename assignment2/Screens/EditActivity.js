import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/Input';
import Datepicker from '../components/Datepicker';
import { Alert } from 'react-native';
import { colors } from "../StylesHelper";
import { deleteFromDB, writeToDB } from '../firebase-files/firestoreHelper';
import { doc, getDoc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import {database} from "../firebase-files/firebaseSetup"
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';
import Checkbox from 'expo-checkbox';

const EditActivity = ({route,navigation}) => {
    const {documentId,origin} = route.params;
    console.log(route.params.origin)

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

    const [isChecked, setChecked] = useState(false);

    // const [initialActivity, setInitialActivity] = useState(null);

    function deleteHandler(deletedId){
      Alert.alert(
        "Delete",
        "Are you sure you want to delete this item?",
        [
          {
            text:"No",
            onPress: () => console.log("No Pressed"),
            style: "No"
          },
          {
            text:"Yes",
            onPress: () => {
              deleteFromDB(deletedId).then(()=>{
                if (origin === 'AllActivities') {
                  navigation.navigate('All Activities');
              } else if (origin === 'SpecialActivities') {
                  navigation.navigate('Special Activities');
              }
              }).catch((err)=>{
                console.error("error",err)
              });
            },
          },
        ],
        { cancelable: false }
      )   
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

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setActivity({ id: docSnap.id, ...docSnap.data() });
            setActivityName(docSnap.data().activityName);
            setDuration(docSnap.data().duration);
            
            const dateStr = docSnap.data().date;
            const parsedDate = moment(dateStr, "ddd, MMM D, YYYY").toDate();

            // set initial activity to compare
            // setInitialActivity({
            //   activityName: docSnap.data.activityName,
            //   duration: docSnap.data.duration,
            //   date: docSnap.data.date,
            //   isSpecial: docSnap.data.isSpecial
            // });

            if (moment(parsedDate).isValid()) {
              setDate(parsedDate);
              setIsDateSelected(true);
            } else {
              console.log("Error: Invalid date format.");
            }
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
        const isValidNumber = /^\d+(\.\d+)?$/.test(duration);
        if (!isValidNumber || durationNumber <= 0) {
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
        if (origin === 'AllActivities') {
            navigation.navigate('All Activities');
        } else if (origin === 'SpecialActivities') {
            navigation.navigate('Special Activities');
        }
    }

    // save the user inputs to update the activity object and save it to the database
    const handleSave = async (activityName,duration,date) =>{
        const isValid = validateInput();

        if (isValid){
          // const currentDate = date.toLocaleDateString('en-US', {
          //   weekday: 'short', 
          //   year: 'numeric', 
          //   month: 'short', 
          //   day: 'numeric'
          // });
      
          // if (activityName === initialActivity.activityName &&
          //     duration === initialActivity.duration &&
          //     currentDate === initialActivity.date &&
          //     isSpecial === initialActivity.isSpecial
          //     ) {
          //   Alert.alert("Notice", "No changes were made.");
          //   return;
          // }

          const {documentId} = route.params;
          const db = getFirestore();
          const activityRef = doc(db, "activities", documentId);
          
          const isSpecial = (activityName == "Running" || activityName == "Weights" || parseInt(duration) > 60) && isChecked == false;

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

          Alert.alert(
            "Important",
            "Are you sure you want to save this changes?",
            [
              {
                text:"No",
                onPress: () => console.log("No Pressed"),
                style: "No"
              },
              {
                text:"Yes",
                onPress: async () => {
                  await updateDoc(activityRef,updatedActivity);
                  // Alert.alert("Success", "Activity updated successfully");
                  setActivityName(null);
                  setDuration('')
                  setIsDateSelected(false)
                  if (origin === 'AllActivities') {
                    navigation.navigate('All Activities');
                  } else if (origin === 'SpecialActivities') {
                    navigation.navigate('Special Activities');
                }
                },
              },
            ],
            { cancelable: false }
          ) 
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
    {activity && activity.isSpecial && (
    <View style={styles.checkboxContainer}>
    <Text style={styles.checkboxText}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
    <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={(newValue) => {
        setChecked(newValue);
        // updateActivityIsSpecial(documentId, !newValue);
      }}
        color={isChecked ? '#4630EB' : undefined}
      />  
    </View>
    )}
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
      checkboxContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width:300
      },
      checkbox: {
        margin: 8,
      },
      checkboxText:{
        fontSize:14,
        color:colors.primary,
        fontWeight:"bold"
      }
        
        
})