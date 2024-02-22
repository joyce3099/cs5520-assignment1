import { FlatList,StyleSheet, Text, View } from 'react-native'
import React from 'react';
import ActivityItem from './ActivityItem';

// filter the activities and wrap them in a flatList
const ActivitiesList = ({ activities, filterFn }) => {
    const filteredActivities = activities.filter(filterFn);

    const renderItem = ({ item }) => (
        <ActivityItem 
          activityName={item.activityName}
          duration={item.duration}
          date={item.date}
          isSpecial={item.isSpecial}
        />
      );
  
    return (
        <View>
        <FlatList
          data={filteredActivities}
          renderItem={renderItem}
        />
      </View>
    );
  };
  
  export default ActivitiesList;