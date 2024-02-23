import { Platform,StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const Datepicker = ({ date, setDate, show, setShow, isDateSelected,setIsDateSelected}) => {

  const handlePress = () => {
    setShow(true);
  };

  // set the date picker 
    const onChange = (event,selectedDate) => {
        const currentDate = selectedDate || date; 
        setShow(Platform.OS === 'ios');

        if (selectedDate) {
            setDate(currentDate);
            setIsDateSelected(true); 
            setShow(false);
        } else {
            setDate(new Date());
            setShow(false);
            // setIsDateSelected(false); 
        }
    }

    const showDatepicker = () => {
      setShow(true);
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
        borderWidth:2,
        borderColor: '#483D8B',
        borderRadius: 5,
        width: '100%',
        height: 35,
        fontSize: 20,
        marginBottom: 20, 
      },
      label: {
        fontSize: 14, 
        marginBottom: 8, 
        color:"#483D8B",
        fontWeight:'bold',
        },
      
})