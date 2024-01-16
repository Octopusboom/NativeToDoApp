import React from "react";
import { Snackbar } from "react-native-paper";

const SnackBar = ({ visible, onDismiss, message }) => {
  return (
    <Snackbar
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
