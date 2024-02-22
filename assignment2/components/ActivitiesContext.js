import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

const ActivitiesContext = createContext();

// save the activities array data in context
export const ActivitiesProvider = ({children}) =>{
    const [activities,setActivities] = useState([])

    return (
       <ActivitiesContext.Provider value={{activities,setActivities}} >
        {children}
      </ActivitiesContext.Provider>
    )
}

export const useActivities = () => useContext(ActivitiesContext);

const styles = StyleSheet.create({})