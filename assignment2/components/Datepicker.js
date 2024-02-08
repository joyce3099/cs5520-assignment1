import { Platform,StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const Datepicker = ({ date, setDate, show, setShow, isDateSelected,setIsDateSelected}) => {

    const onChange = (event,selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
            setIsDateSelected(true); 
            setShow(false);
        } else {
            setShow(false);
        }
    }

    const showDatepicker = () => {
        setShow(true);
      };
    
  return (
    <View>
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

export default Datepicker

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