import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../StylesHelper";

const BottomTab = ({navigation}) => {

    // get the current page state to set the bottom tab button color
    const state = navigation.getState();
    const activeRouteName = state.routeNames[state.index];

    const allActivitiesColor = activeRouteName === "All Activities" ? colors.orange : "grey";
    const specialActivitiesColor = activeRouteName === "Special Activities" ? colors.orange : "grey";

    function handleAll(){
        navigation.navigate("All Activities");
      }
    
      function handleSpecial() {
        navigation.navigate("Special Activities");
      }
      

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={handleAll}>
          <FontAwesome name="dollar" size={24} color={allActivitiesColor} />
          <Text style={[styles.buttonText,{ color: allActivitiesColor }]}>All Activities</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={handleSpecial}>
          <AntDesign name="exclamation" size={24} color={specialActivitiesColor} />
          <Text style={[styles.buttonText,{ color: specialActivitiesColor }]}>Special Activities</Text>
        </TouchableOpacity>
        
      </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.primary,
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
        fontSize: 13,
        paddingTop: 4, 
      },
})