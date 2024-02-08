import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ActivityList = ({activityName,date,duration}) => {
  return (
    <View style={styles.container}>
      <Text>{activityName}</Text>
      <Text style={styles.dateContainer}>{date}</Text>
      <Text style={styles.dateContainer}>{duration}min</Text>
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
        margin:20,
        paddingHorizontal: 10,
    },
    dateContainer:{
        backgroundColor:"white",
        margin:10,
    }

})