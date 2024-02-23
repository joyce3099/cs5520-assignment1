import { Platform,StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../StylesHelper';

const Datepicker = ({ date, setDate, show, setShow, isDateSelected,setIsDateSelected}) => {

  // set the date picker 
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

    const handlePress = () => {
      setShow(!show);
      if (!isDateSelected) {
        const currentDate = new Date();
        setDate(currentDate);
        setIsDateSelected(true);
      }
    };
  
    
  return (
    <View>
        <Text style={styles.label}>Date *</Text>
    <TextInput style={styles.input}
        value={isDateSelected ? date.toLocaleDateString('en-US', {
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
      }) : ''}
        showSoftInputOnFocus={false}
        onPressIn={handlePress}
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
        borderWidth:2,
        borderColor: colors.primary,
        borderRadius: 5,
        width: '100%',
        height: 35,
        fontSize: 18,
        marginBottom: 20, 
        color:colors.primary
      },
      label: {
        fontSize: 14, 
        marginBottom: 8, 
        color:colors.primary,
        fontWeight:'bold',
        },
      
})