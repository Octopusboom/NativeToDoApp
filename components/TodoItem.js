import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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

  const creationDate = new Date(item.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <LinearGradient
      colors={item.completed ? ["#B8F4B4", "#EBF1F5"] : ["#D9E8F2", "#EBF1F5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={taskContainerStyle}
    >
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
          <View>
            <Text
              style={{
                ...styles.taskText,
                textDecorationLine: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
            </Text>
            <Text style={styles.creationDate}>{creationDate}</Text>
          </View>
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
    </LinearGradient>
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
    fontSize: 16,
    color: "#3C79B0",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  creationDate: {
    fontSize: 12,
    color: "#A0A0A0",
    fontStyle: "italic",
    marginTop: 6
  },
});

export default TodoItem;
