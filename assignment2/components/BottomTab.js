import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const BottomTab = ({navigation}) => {

    function handleAll(){
        navigation.navigate("All Activities");
      }
    
      function handleSpecial() {
        navigation.navigate("Special Activities");
      }
      

  return (
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
  )
}

export default BottomTab

const styles = StyleSheet.create({
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