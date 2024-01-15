import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const CustomButton = ({ onPress, containerColor, icon, iconColor, size }) => {
  return (

<IconButton
icon={icon}
iconColor={iconColor}
size={size}
style={styles.button}
onPress={onPress}
containerColor={containerColor}
/>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 8,
  },
});

export default CustomButton;
