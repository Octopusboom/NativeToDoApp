import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const AddButton = ({ onPress, disabled }) => {
  return (
    <IconButton
      icon="plus"
      iconColor="#fff"
      size={24}
      style={styles.addButton}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#3C79B0",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddButton;
        