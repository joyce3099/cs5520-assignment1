import { Button,Pressable,StyleSheet, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import ActivityList from '../components/ActivityList';
import BottomTab from '../components/BottomTab';
import { collection,onSnapshot } from "firebase/firestore";
import {database} from "../firebase-files/firebaseSetup";
import { FontAwesome6 } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';

const SpecialActivities = ({navigation}) => {

  const [activities, setActivities] = useState([]);

  useEffect(()=>{
    // set up a listener to get realtime data from firestore - only after the first render
    onSnapshot(collection(database,"activities"),(querySnapshot)=>{
      if (querySnapshot.empty){
        Alert.alert("You need to add something");
        return;
      }
      let newArray = []
      // look through this querySnapshot
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(),id:doc.id});
    });
    setActivities(newArray);
    })
  },[])

// navigate to the add activity page
  function addHandler(){
    navigation.navigate("Add An Activity",{origin: 'SpecialActivities'});
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton onPressFunction={addHandler}>
          <FontAwesome6 name="add" size={24} color="white" />
        </PressableButton>
      ),
    });
  }, [navigation]); 

  return (
    <View style={styles.container}>
     <View style={styles.activityContainer}>
      <ActivityList activities={activities} filterFn={activity => activity.isSpecial} navigation={navigation} origin="SpecialActivities"/>
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
      },
      // addButton:{
      //   marginRight:30
      // } 
})