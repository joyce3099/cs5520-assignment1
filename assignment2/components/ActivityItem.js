import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { colors } from "../StylesHelper";

const ActivityItem = ({activityId,activityName,date,duration,isSpecial,navigation,origin}) => {
  
  function activityPressHandler() {
    navigation.navigate("Edit", { documentId: activityId, origin: origin});
  }

  return (
    <View >
    <Pressable style={({ pressed }) => {return [styles.container,, pressed && styles.pressed];}}
      onPress={activityPressHandler}>
      <Text style={styles.activityContainer}>{activityName}</Text>
      {isSpecial && <Entypo style={styles.specialSign} name="warning" size={24} color="black" />}
      <View style={styles.dateContainer}>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.text}>{duration} min</Text>
      </View>
      </Pressable>
    </View>
  )
}

export default ActivityItem

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        height:50,
        flexDirection: 'row',
        margin:15,
        paddingHorizontal: 10,
        borderRadius:6,
    },
    activityContainer:{
        color:colors.white,
        marginTop:12,
        fontSize:15,
        fontWeight:'bold',
        flex:1
    },
    specialSign:{
        marginTop:12,
        flex:0.5,
        color:colors.orange
    },
    dateContainer:{
        backgroundColor:colors.white,
        width:140,
        marginTop:12,
        marginBottom:12,
        marginLeft:1,
        marginRight:4,
        justifyContent:"center",
        alignItems:"center"
    },
    timeContainer:{
        backgroundColor:colors.white,
        width:70,
        marginTop:12,
        marginBottom:12,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontWeight:'bold',
        color:colors.primary
    },
    pressed: {
      opacity: 0.5,
    },
})