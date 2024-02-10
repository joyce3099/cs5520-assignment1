import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextInputComponent = ({ label, value, onChangeText, error }) => {
  return (
    <View >
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    label: {
      fontSize: 14, 
      marginBottom: 8, 
      color:"#483D8B",
      fontWeight:'bold',
    },
    input: {
      borderWidth:2,
      borderColor: '#483D8B',
      borderRadius: 5,
      width: '100%',
      height: 35,
      fontSize: 20, 
    },
    errorText: {
      color: 'black',
    },
  });
  
  export default TextInputComponent;