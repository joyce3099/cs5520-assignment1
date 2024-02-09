import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import ActivityItem from './ActivityItem';

const ActivitiesList = ({ activities, filterFn }) => {
    const filteredActivities = activities.filter(filterFn);
  
    if (filteredActivities.length === 0) {
      return <Text>No activities to show</Text>;
    }
  
    return (
      <View>
        {filteredActivities.map((activity, index) => (
          <ActivityItem 
            key={index} 
            activityName={activity.activityName}
            duration={activity.duration}
            date={activity.date}
            isSpecial={activity.isSpecial}
          />
        ))}
      </View>
    );
  };
  
  export default ActivitiesList;