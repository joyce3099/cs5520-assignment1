
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './Screens/Start';
import AllActivities from './Screens/AllActivities';
import SpecialActivities from './Screens/SpecialActivities';
import AddActivity from './Screens/AddActivity';
import EditActivity from "./Screens/EditActivity"
import { colors } from "./StylesHelper";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
   
     <Stack.Navigator 
       screenOptions={{
          cardStyle: { backgroundColor: '#E6E6FA' }, 
          headerBackTitle: null,
        }}>
      <Stack.Screen 
        options={
          {headerShown:false}}
        name = "Start"
        component={Start}
      />
      <Stack.Screen 
        options={
          {headerStyle:
        {backgroundColor:colors.primary},
        headerTintColor:colors.white,
        headerLeft: () => null}}
        name = "All Activities"
        component={AllActivities}
      />
      <Stack.Screen 
        options={
          {headerStyle:
        {backgroundColor:colors.primary},
        headerTintColor:colors.white,
        headerLeft: () => null}}
        name = "Special Activities"
        component={SpecialActivities}
      />
      <Stack.Screen 
        options={
          {headerStyle:
        {backgroundColor:colors.primary},
        headerTintColor:colors.white}}
        name = "Add An Activity"
        component={AddActivity}
      />
      <Stack.Screen 
        options={
          {headerStyle:
        {backgroundColor:colors.primary},
        headerTintColor:colors.white}}
        name = "Edit"
        component={EditActivity}
      />
      
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
