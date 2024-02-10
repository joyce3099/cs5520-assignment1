import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input';

const Start = ({navigation}) => {
  const [email,setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [number,setNumber] = useState('');
  const [numberError, setNumberError] = useState(false);

  const isUserTyped = email.trim() !== '' || number.trim() !== '';

  const handleReset = () =>{
    setEmail('');
    setNumber('');
    setEmailError(false);
    setNumberError(false);
  }

  const handleStart = (inputEmail, inputNumber) => {
    let isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)
    let isPhoneNumberValid = /^\d{10}$/.test(inputNumber);

    setEmailError(!isEmailValid);
    setNumberError(!isPhoneNumberValid);

    if (isEmailValid && isPhoneNumberValid) {
      navigation.navigate("All Activities")
    } else {

    }
  }

  return (
    <View style={styles.container}>
      <Input 
        itemText="Email Address"
        item={email}
        setItem={setEmail}
        itemError={emailError && 'Please enter a valid email address'}
      />
      <Input 
        itemText="Phone Number"
        item={number}
        setItem={setNumber}
        itemError={numberError && 'Please enter a valid phone number'}
      />
      
      <View style={styles.buttonsContainer}>
        <Button color="red" title="Reset" onPress={handleReset}/>
        <Button title="Start" onPress={() =>handleStart(email, number)} disabled={!isUserTyped}/>
      </View>
    </View>
  )
}

export default Start

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center', 
  },
  buttonsContainer: 
    { flexDirection: "row" ,
    justifyContent: 'space-around',
    width:300
  }
})