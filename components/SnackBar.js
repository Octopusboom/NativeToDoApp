import React from "react";
import { Snackbar } from "react-native-paper";

const SnackBar = ({ visible, onDismiss, message }) => {
  return (
    <Snackbar
      style={{ backgroundColor: "#3C79B0" }}
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: "OK",
        onPress: onDismiss,
        color: "#fff"
      }}
    >
      {message}
    </Snackbar>
  );
};

export default SnackBar;
