import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";
import DeleteModal from "./components/DeleteModal";
import SnackBar from "./components/SnackBar";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  // The state for creating a new TODO
  const [newTodo, setNewTodo] = useState("");

  // The state for toggle the edit input for a TODO by id
  const [editingTodoId, setEditingTodoId] = useState(null);

  // The state for editing a TODO by id
  const [editingTodoText, setEditingTodoText] = useState("");

  // State for handling the delete confirmation modal
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  // I'm using this state to store the id of the todo that is going to be deleted (need for modal)
  const [currentTodoId, setCurrentTodoId] = useState(null);

  // The state for filtering the TODOS
  const [filter, setFilter] = useState("all"); // "all", "done", or "undone"

  // Snackbar state
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Load todos from AsyncStorage (by using getItem)
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  //  Load todos on component mounts
  useEffect(() => {
    loadTodos();
  }, []);

  // Saving todos in the AsyncStorage (by using setItem)
  const saveTodos = async (updatedTodos) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  };

  // Adding a new TODO
  const addTodo = () => {
    const updatedTodos = [
      ...todos,
      { id: Date.now(), text: newTodo, completed: false },
    ];
    setTodos(updatedTodos);
    setNewTodo("");
    saveTodos(updatedTodos);
  };

  // Toggles the status of a todo
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Edit todo
  const editTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };
  // Save the new text for the edited todo
  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editingTodoText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText("");
    saveTodos(updatedTodos);

    // Show Snackbar
    setSnackbarMessage("Todo updated successfully");
    setSnackbarVisible(true);
  };

  // Delete TODO
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText("");
    saveTodos(updatedTodos);
    setDeleteModalVisible(false);

    // Show Snackbar
    setSnackbarMessage("Todo deleted successfully");
    setSnackbarVisible(true);
  };

  const renderTodo = ({ item }) => (
    <TodoItem
      item={item}
      editingTodoId={editingTodoId}
      editingTodoText={editingTodoText}
      setEditingTodoId={setEditingTodoId}
      setEditingTodoText={setEditingTodoText}
      toggleTodo={toggleTodo}
      editTodo={editTodo}
      saveEditedTodo={saveEditedTodo}
      deleteTodo={() => {
        setDeleteModalVisible(true);
        setCurrentTodoId(item.id);
      }}
    />
  );

  const filterTodos = () => {
    switch (filter) {
      case "done":
        return todos.filter((todo) => todo.completed);
      case "undone":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.appContainer}>
        <TodoHeader
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
          filter={filter}
          setFilter={setFilter}
        />
        <FlatList
          data={filterTodos()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTodo}
        />
        {/* Delete Confirmation Modal */}
        <DeleteModal
          visible={isDeleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={() => {
            deleteTodo(currentTodoId);
          }}
        />
      </View>
      <SnackBar
          visible={isSnackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          message={snackbarMessage}
        />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    padding: 16,
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#fcfafa",
  },
});

export default TodoApp;
