
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './Screens/Start';
import AllActivities from './Screens/AllActivities';
import SpecialActivities from './Screens/SpecialActivities';
import AddActivity from './Screens/AddActivity';
import EditActivity from "./Screens/EditActivity"
import { ActivitiesProvider } from './components/ActivitiesContext';
import { colors } from "./StylesHelper";


const Stack = createStackNavigator();

export default function App() {
  return (
    <ActivitiesProvider>
    <NavigationContainer>
   
     <Stack.Navigator 
       screenOptions={{
          cardStyle: { backgroundColor: '#E6E6FA' }, 
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
        headerTintColor:colors.white}}
        name = "All Activities"
        component={AllActivities}
      />
      <Stack.Screen 
        options={
          {headerStyle:
        {backgroundColor:colors.primary},
        headerTintColor:colors.white}}
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
    </ActivitiesProvider>
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
