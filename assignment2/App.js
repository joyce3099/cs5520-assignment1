import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './Screens/Start';
import AllActivities from './Screens/AllActivities';
import SpecialActivities from './Screens/SpecialActivities';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddActivity from './Screens/AddActivity';
import { ActivitiesProvider } from './components/ActivitiesContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Activities" component={AllActivities} />
      <Tab.Screen name="Special Activities" component={SpecialActivities} />
    </Tab.Navigator>
  )
}
  


export default function App() {
  return (
    <ActivitiesProvider>
    <NavigationContainer>
   
     <Stack.Navigator 
       screenOptions={{
          cardStyle: { backgroundColor: '#E6E6FA' }, 
        }}>
      <Stack.Screen 
        name = "Start"
        component={Start}
      />
      {/* <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} /> */}
      <Stack.Screen 
        options={
          {headerStyle:
        {backgroundColor:"#483D8B"},
        headerTintColor:"white",}}
        name = "All Activities"
        component={AllActivities}
      />
      <Stack.Screen 
        options={
          {headerStyle:
        {backgroundColor:"#483D8B"},
        headerTintColor:"white",}}
        name = "Special Activities"
        component={SpecialActivities}
      />
      <Stack.Screen 
        options={
          {headerStyle:
        {backgroundColor:"#483D8B"},
        headerTintColor:"white",}}
        name = "Add An Activity"
        component={AddActivity}
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
