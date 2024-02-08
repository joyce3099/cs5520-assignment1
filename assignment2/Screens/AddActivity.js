import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddActivity = () => {
    const [open, setOpen] = useState(false);
    const [activity, setActivity] = useState(null);
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

    const onChange = (event,selectedDate) => {
        
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
            setIsDateSelected(true); 
        } else {
            setShow(false);
        }
    }

    const showDatepicker = () => {
        setShow(true);
      };

  return (
    <View>
      <Text>Activity *</Text>
      <DropDownPicker
      placeholder='Select An Activity'
      open={open}
      value={activity}
      items={items}
      setOpen={setOpen}
      setValue={setActivity}
      setItems={setItems}
    />
    <Input 
      itemText="Duration (min) *"
      item={duration}
      setItem={setDuration}
      itemError={durationError && 'Please enter a valid duration'}
    />
    <Text>Date *</Text>
    <TextInput style={styles.input}
        value={isDateSelected ? date.toLocaleDateString('en-US', {
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
      }) : ''}
        onFocus={showDatepicker} 
        showSoftInputOnFocus={false}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          display="inline"
          onChange={onChange}
        />
      )}
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
})