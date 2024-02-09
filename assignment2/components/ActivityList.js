import { FlatList,StyleSheet, Text, View } from 'react-native'
import React from 'react';
import ActivityItem from './ActivityItem';

const ActivitiesList = ({ activities, filterFn }) => {
    const filteredActivities = activities.filter(filterFn);
  
    if (filteredActivities.length === 0) {
      return <Text>No activities to show</Text>;
    }

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
        //   keyExtractor={(item, index) => index.toString()} // 提供唯一的key值
        />
      </View>
    );
  };
  
  export default ActivitiesList;