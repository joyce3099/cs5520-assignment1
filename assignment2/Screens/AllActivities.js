import { Button, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useActivities } from '../components/ActivitiesContext';
import ActivityList from '../components/ActivityList';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const AllActivities = ({navigation}) => {

  const { activities } = useActivities();

  function addHandler(){
    navigation.navigate("Add An Activity");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Add" color="orange" onPress={addHandler}/>
      ),
    });
  }, [navigation]); 

  function handleAll(){
    navigation.navigate("All Activities");
  }

  function handleSpecial() {
    navigation.navigate("Special Activities");
  }
  

  return (
    <View style={styles.container}>
      {activities && activities.length > 0 ? (
        activities.map((activity, index) => (
        <ActivityList 
          key={index} 
          activityName={activity.activityName}
          duration ={activity.duration}
          date={activity.date}
          isSpecial={activity.isSpecial}>
        </ActivityList>)
      )) : (
        <Text>No activities yet</Text>
        )
      }
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={handleAll}>
          <FontAwesome name="dollar" size={24} color="orange" />
          <Text style={styles.buttonText}>All Activities</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={handleSpecial}>
          <AntDesign name="exclamation" size={24} color="orange" />
          <Text style={styles.buttonText}>Special Activities</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

export default AllActivities

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#483D8B",
    paddingBottom: 40, 
  },
  iconButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    paddingTop: 4, 
  },

})