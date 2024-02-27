import { StyleSheet, Text, View } from 'react-native'
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

    // allow user to delete the activity from database and send alert
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
                // allow user to go back to the origin page after deleting the item
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

    // fetch the activity item from database with unique documentId
    useEffect(()=>{
      const fetchActivity = async () => {
        const db = getFirestore();
        const docRef = doc(db, "activities", documentId);
        const docSnap = await getDoc(docRef);
        
        // if the documentId exists in database, 
        // then set the Activity with the data in database
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
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

    // allow user to go back to the origin page after pressing the cancel button
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

          // send alert to user to confirm if they want to save the changes
          // and set the values of activity to null 
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
                  setActivityName(null);
                  setDuration('')
                  setIsDateSelected(false)

                  // allow user to go back to the origin page after pressing the save button
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
      <DropDownPicker style={styles.dropDownPicker}
      placeholder={activityName}
      open={open}
      value={activityName}
      items={items}
      setOpen={setOpen}
      setValue={setActivityName}
      setItems={setItems}
      placeholderStyle={{ color: colors.primary }} 
      labelStyle={{color: colors.primary,fontSize:18}}
      listItemLabelStyle={{ color: colors.primary }}
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
    <View style={styles.lastPartContainer}>
    {activity && activity.isSpecial && (
    <View style={styles.checkboxContainer}>
    <Text style={styles.checkboxText}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
    <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={(newValue) => {
        setChecked(newValue);
      }}
        color={isChecked ? '#4630EB' : undefined}
      />  
    </View>
    )}
    <View style={styles.buttonsContainer}>
      <PressableButton customStyle={styles.cancelButton} onPressFunction={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </PressableButton>
      
      <PressableButton customStyle={styles.saveButton} onPressFunction={() =>handleSave(activityName,duration,date)}>
        <Text style={styles.buttonText}>Save</Text>
      </PressableButton>
      
     </View>
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
        width:280
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
        width:300,
        marginBottom:20
      },
      checkbox: {
        margin: 8,
      },
      checkboxText:{
        fontSize:14,
        color:colors.primary,
        fontWeight:"bold"
      },
      buttonText:{
        fontSize:18,
        color:"white"
      },
      cancelButton:{
        backgroundColor: "#DB7093",
      },
      saveButton:{
        backgroundColor:colors.primary,
      },
      dropDownPicker:{
        borderWidth:2,
        borderColor: colors.primary,
        borderRadius: 5,
        backgroundColor:"#E6E6FA",
        height: 35,
        fontSize: 20, 
        color:colors.primary,
        marginBottom:10,
      },

        
        
})