import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Entypo } from '@expo/vector-icons';

const ActivityList = ({activityName,date,duration,isSpecial}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.activityContainer}>{activityName}</Text>
      {isSpecial && <Entypo style={styles.specialSign} name="warning" size={24} color="black" />}
      <View style={styles.dateContainer}>
        <Text >{date}</Text>
      </View>
      <Text style={styles.timeContainer}>{duration} min</Text>
    </View>
  )
}

export default ActivityList

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#483D8B",
        height:50,
        flexDirection: 'row',
        justifyContent:"space-evenly",
        margin:16,
        paddingHorizontal: 10,
        borderRadius:6,
    },
    
    activityContainer:{
        color:"white",
        margin:12,
        fontSize:15,
        fontWeight:'bold',
        flex:1.5
    },
    specialSign:{
        margin:12,
        flex:0.5,
        color:"orange"
    },
    dateContainer:{
        backgroundColor:"white",
        width:120,
        margin:12,
        flex:2.5,
        fontWeight:'bold',
    },
    
    timeContainer:{
        backgroundColor:"white",
        width:50,
        margin:12,
        flex:1,
        fontWeight:'bold',
    }

})