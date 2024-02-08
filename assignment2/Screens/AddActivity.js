import { Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Datepicker from '../components/Datepicker';

const AddActivity = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [activityName, setActivityName] = useState(null);
    const [items, setItems] = useState([
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

    const [activities,setActivities] = useState([])

    const handleCancel = () =>{

    }

    const handleSave = (activityName,duration,date) =>{
        const activityId = Date.now().toString();

        const newActivity = {
            activityId,
            activityName,
            duration,
            date: date.toLocaleDateString('en-US', {
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
            })
        };

        setActivities((currentActivities) => [...currentActivities,newActivity])
        console.log(activities)

        setActivityName(null);
        setDuration('')
        setIsDateSelected(false)

        navigation.navigate('All Activities', { activities });
    }

  return (
    <View>
      <Text>Activity *</Text>
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
    <View style={styles.buttonsContainer}>
    <Button title="Cancel" onPress={handleCancel}/>
    <Button title="Save" onPress={() =>handleSave(activityName,duration,date)}/>
    </View>
    </View>
  )
}

export default AddActivity

const styles = StyleSheet.create({
    input: {
        borderWidth:1,
        borderColor: 'purple',
        borderRadius: 5,
        width: '100%',
        height: 35,
        fontSize: 20,
        marginBottom: 20, 
      },
      buttonsContainer: 
        { flexDirection: "row" },
        justifyContent: 'space-evenly',
})