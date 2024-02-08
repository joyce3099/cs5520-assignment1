import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useActivities } from '../components/ActivitiesContext';

const AllActivities = ({navigation}) => {

  const { activities } = useActivities();
  console.log(activities)

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
      {activities.map((activity, index) => (
        <Text key={index} style={styles.activity}>
          Activity: {activity.activityName}, Duration: {activity.duration}, Date: {activity.date}
        </Text>
      ))}
      
    </View>
  )
}

export default AllActivities

const styles = StyleSheet.create({})