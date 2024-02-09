import { Button,StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useActivities } from '../components/ActivitiesContext';
import ActivityList from '../components/ActivityList';
import BottomTab from '../components/BottomTab';

const SpecialActivities = ({navigation}) => {

console.log(navigation)

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
     <View style={styles.activityContainer}>
      <ActivityList activities={activities} filterFn={activity => activity.isSpecial} />
      </View>
      <View style={styles.bottomTabContainer}>
      <BottomTab style={styles.bottomTabContainer} navigation={navigation}/>
      </View>
      
    </View>
  )
}

export default SpecialActivities

const styles = StyleSheet.create({
    container: {
        flex: 6,
        justifyContent: 'space-between',
      },
    
      activityContainer:{
        flex: 5.3,
      },
    
      bottomTabContainer:{
        flex:0.7,
        // paddingBottom: -100, 
      }
})