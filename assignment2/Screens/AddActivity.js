import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/Input';
import Datepicker from '../components/Datepicker';
import { Alert } from 'react-native';
import { colors } from "../StylesHelper";
import { writeToDB } from '../firebase-files/firestoreHelper';
import { collection,onSnapshot } from "firebase/firestore";
import {database} from "../firebase-files/firebaseSetup"
import PressableButton from '../components/PressableButton';

const AddActivity = ({navigation,route}) => {
  // console.log(route.params)
  const {origin} = route.params

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

    const [date, setDate] = useState(null);
    const [show, setShow] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);

    const [activities, setActivities] = useState([])
    

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

    // save the user inputs to create a new activity object and save it to the activities array
    const handleSave = (activityName,duration,date) =>{
        const isValid = validateInput();

        if (isValid){
        const activityId = Date.now().toString();

        const isSpecial = activityName=="Running" || activityName == "Weights" || parseInt(duration) > 60;

        const newActivity = {
            activityId,
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

        setActivities([...activities, newActivity]);
        writeToDB(newActivity);

        setActivityName(null);
        setDuration('')
        setIsDateSelected(false)

        // allow user to go back to the origin page after pressing the save button
        if (origin === 'AllActivities') {
          navigation.navigate('All Activities');
        } else if (origin === 'SpecialActivities') {
          navigation.navigate('Special Activities');
        }
        }
    }

  return (
    <View style={styles.container}>
    <View style={styles.chosenAreaContainer}>
      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker style={styles.dropDownPicker}
      placeholder='Select An Activity'
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
    <Input 
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
    <PressableButton customStyle={styles.cancelButton} onPressFunction={handleCancel}>
      <Text style={styles.buttonText}>Cancel</Text>
    </PressableButton>
    <PressableButton customStyle={styles.saveButton} onPressFunction={() =>handleSave(activityName,duration,date)}>
      <Text style={styles.buttonText}>Save</Text>
    </PressableButton>
    </View>
    </View>
  )
}

export default AddActivity

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:"center",
      justifyContent:"space-around",
      
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
})