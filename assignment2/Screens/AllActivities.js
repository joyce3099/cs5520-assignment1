import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const AllActivities = ({navigation,route}) => {

  // const {activities} = route.params || []


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
      {/* {activities && activities.length > 0 ? (
        activities.map((activity, index) => (
          <Text key={index} style={styles.activityText}>
            {`Activity: ${activity.activityName}, Duration: ${activity.duration}, Date: ${activity.date}`}
          </Text>
        ))
      ) : (
        <Text style={styles.noActivitiesText}>No activities added yet.</Text>
      )} */}
    </View>
  )
}

export default AllActivities

const styles = StyleSheet.create({})