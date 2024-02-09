import { Button, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useActivities } from '../components/ActivitiesContext';
import ActivityList from '../components/ActivityList';
import BottomTab from '../components/BottomTab';

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

  return (
    <View style={styles.container}>
      <ActivityList activities={activities} filterFn={() => true} />
      <BottomTab navigation={navigation}/>
    </View>
  )
}

export default AllActivities

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
})