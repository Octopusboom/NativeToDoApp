
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const DeleteModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you really want to delete this task?</Text>
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={onCancel}
              style={styles.cancelButton}
              labelStyle={styles.cancelButtonText}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={onConfirm}
              style={styles.confirmButton}
              labelStyle={styles.confirmButtonText}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    borderColor: "#999",
  },
  cancelButtonText: {
    color: "#999",
  },
  confirmButton: {
    backgroundColor: "#f7549e",
  },
  confirmButtonText: {
    color: "#fff",
  },
});

export default DeleteModal;