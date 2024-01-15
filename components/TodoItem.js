import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import CustomButton from "./CustomButton";

const TodoItem = ({
  item,
  editingTodoId,
  editingTodoText,
  setEditingTodoText,
  toggleTodo,
  editTodo,
  saveEditedTodo,
  deleteTodo,
}) => {
  const taskContainerStyle = {
    ...styles.taskContainer,
    backgroundColor: item.completed ? "#D7F9D0" : "#EBF1F5",
  };

  return (
    <View style={taskContainerStyle}>
      {editingTodoId === item.id ? (
        <>
          <TextInput
            style={styles.editInput}
            value={editingTodoText}
            onChangeText={(text) => setEditingTodoText(text)}
            placeholder="Edit todo..."
          />
          <CustomButton
            onPress={() => saveEditedTodo(item.id)}
            icon="content-save"
            iconColor="#fff"
            size={20}
            containerColor="#259B5B"
          />
        </>
      ) : (
        <>
          <Text
            style={{
              ...styles.taskText,
              textDecorationLine: item.completed ? "line-through" : "none",
            }}
          >
            {item.text}
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              title={item.completed ? "Undo" : "Complete"}
              onPress={() => toggleTodo(item.id)}
              icon={item.completed ? "undo" : "check"}
              iconColor="#fff"
              size={20}
              containerColor={item.completed ? "#3C79B0" : "#259B5B"}
            />
            <CustomButton
              onPress={() => editTodo(item.id, item.text)}
              icon="pencil"
              iconColor="#fff"
              size={20}
              containerColor="#C0C3D8"
            />
            <CustomButton
              onPress={() => deleteTodo(item.id)}
              icon="delete"
              iconColor="#fff"
              size={20}
              containerColor="#f7549e"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 4,
  },
  editInput: {
    flex: 1,
    borderRadius: 5,
    borderColor: "#3C79B0",
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#3C79B0",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TodoItem;
