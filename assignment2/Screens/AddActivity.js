import { Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Datepicker from '../components/Datepicker';
import { useActivities } from '../components/ActivitiesContext';
import { Alert } from 'react-native';
import { colors } from "../StylesHelper";


const AddActivity = ({navigation}) => {
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

    const { activities, setActivities } = useActivities();

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
        navigation.navigate('All Activities', { activities });
    }

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
        console.log(activities)

        setActivityName(null);
        setDuration('')
        setIsDateSelected(false)

        navigation.navigate('All Activities', { activities });
        }
    }

  return (
    <View style={styles.container}>
    <View style={styles.chosenAreaContainer}>
      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
      placeholder='Select An Activity'
      open={open}
      value={activityName}
      items={items}
      setOpen={setOpen}
      setValue={setActivityName}
      setItems={setItems}
    />
    <Input 
      style={styles.durationContainer}
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

export default AddActivity

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:"center",
      justifyContent:"space-around",
      
    },
      chosenAreaContainer:{
        // width:350
      },
      durationContainer:{
        
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