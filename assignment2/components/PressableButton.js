import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PressableButton({
  customStyle,
  onPressFunction,
  disableEvent,
  children,
}) {
  return (
    <Pressable
      onPress={onPressFunction}
      disabled={disableEvent}
      style={({ pressed }) => [
        styles.defaultStyle,
        customStyle,
        pressed && styles.pressed,
        disableEvent && styles.disabled, 
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    borderRadius: 5,
    padding: 5,
    justifyContent:"center",
    alignItems:"center",
    width:130,
    height:30,
    // backgroundColor: "#aaa",
  },
  pressed: {
    opacity: 0.5,
  },
  disabled: {
    backgroundColor: '#CCC',
    color: '#666', 
  },
});