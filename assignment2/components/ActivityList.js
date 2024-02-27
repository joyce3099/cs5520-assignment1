import { FlatList,StyleSheet, Text, View } from 'react-native'
import React from 'react';
import ActivityItem from './ActivityItem';

// filter the activities and wrap them in a flatList
const ActivityList = ({ activities, filterFn,navigation,origin }) => {
    const filteredActivities = activities.filter(filterFn);

    const renderItem = ({ item }) => (
        <ActivityItem 
          activityId ={item.id}
          activityName={item.activityName}
          duration={item.duration}
          date={item.date}
          isSpecial={item.isSpecial}
          navigation={navigation}
          origin={origin}
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
  
  export default ActivityList;