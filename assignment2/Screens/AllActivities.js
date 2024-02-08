import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const AllActivities = ({navigation}) => {

  function addHandler(){
    navigation.navigate("Add An Activity");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Add" color="yellow" onPress={addHandler}/>
      ),
    });
  }, [navigation]); 

  return (
    <View>
      <Text>AllActivities</Text>
    </View>
  )
}

export default AllActivities

const styles = StyleSheet.create({})