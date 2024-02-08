import { StyleSheet, View} from 'react-native'
import React from 'react'
import TextInputComponent from './TextInputComponent';

const Input = ({
  itemText,
  item,
  setItem,
  itemError,
}) => {

  return (
    <View style={styles.container}>
      <TextInputComponent
        label={itemText}
        value={item}
        onChangeText={setItem}
        error={itemError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    width:390,
  }
})

export default Input