import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useActivities } from '../components/ActivitiesContext';
import ActivityList from '../components/ActivityList';

const AllActivities = ({navigation}) => {

  const { activities } = useActivities();

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
      {activities && activities.length > 0 ? (
        activities.map((activity, index) => (
        <ActivityList 
          key={index} 
          activityName={activity.activityName}
          duration ={activity.duration}
          date={activity.date}>
        </ActivityList>)
      )) : (
        <Text>No activities yet</Text>
        )
      }
      
    </View>
  )
}

export default AllActivities

const styles = StyleSheet.create({})