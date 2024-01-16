import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";
import DeleteModal from "./components/DeleteModal";
import SnackBar from "./components/SnackBar";

const TodoApp = () => {
  const [todoState, setTodoState] = useState({
    todos: [],
    newTodo: "",
    editingTodoId: null,
    editingTodoText: "",
    isDeleteModalVisible: false,
    currentTodoId: null,
    filter: "all",
    isSnackbarVisible: false,
    snackbarMessage: "",
  });

  // Load todos from AsyncStorage (by using getItem)
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) {
        setTodoState((prevState) => ({ ...prevState, todos: JSON.parse(storedTodos) }));
      }
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  // Load todos on component mounts
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
      ...todoState.todos,
      { id: Date.now(), text: todoState.newTodo, completed: false },
    ];
    setTodoState((prevState) => ({
      ...prevState,
      todos: updatedTodos,
      newTodo: "",
    }));
    saveTodos(updatedTodos);
  };

  // Toggles the status of a todo
  const toggleTodo = (id) => {
    const updatedTodos = todoState.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoState((prevState) => ({ ...prevState, todos: updatedTodos }));
    saveTodos(updatedTodos);
  };

  // Edit todo
  const editTodo = (id, text) => {
    setTodoState((prevState) => ({
      ...prevState,
      editingTodoId: id,
      editingTodoText: text,
    }));
  };

  // Save the new text for the edited todo
  const saveEditedTodo = (id) => {
    const updatedTodos = todoState.todos.map((todo) =>
      todo.id === id ? { ...todo, text: todoState.editingTodoText } : todo
    );
    setTodoState((prevState) => ({
      ...prevState,
      todos: updatedTodos,
      editingTodoId: null,
      editingTodoText: "",
      isSnackbarVisible: true,
      snackbarMessage: "Todo updated successfully",
    }));
    saveTodos(updatedTodos);
  };

  // Delete TODO
  const deleteTodo = (id) => {
    const updatedTodos = todoState.todos.filter((todo) => todo.id !== id);
    setTodoState((prevState) => ({
      ...prevState,
      todos: updatedTodos,
      editingTodoId: null,
      editingTodoText: "",
      isDeleteModalVisible: false,
      isSnackbarVisible: true,
      snackbarMessage: "Todo deleted successfully",
    }));
    saveTodos(updatedTodos);
  };

  const renderTodo = ({ item }) => (
    <TodoItem
      item={item}
      editingTodoId={todoState.editingTodoId}
      editingTodoText={todoState.editingTodoText}
      setEditingTodoId={(id) => setTodoState((prevState) => ({ ...prevState, editingTodoId: id }))}
      setEditingTodoText={(text) =>
        setTodoState((prevState) => ({ ...prevState, editingTodoText: text }))
      }
      toggleTodo={toggleTodo}
      editTodo={editTodo}
      saveEditedTodo={saveEditedTodo}
      deleteTodo={() => {
        setTodoState((prevState) => ({
          ...prevState,
          isDeleteModalVisible: true,
          currentTodoId: item.id,
        }));
      }}
    />
  );

  const filterTodos = () => {
    switch (todoState.filter) {
      case "done":
        return todoState.todos.filter((todo) => todo.completed);
      case "undone":
        return todoState.todos.filter((todo) => !todo.completed);
      default:
        return todoState.todos;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.appContainer}>
        <TodoHeader
          newTodo={todoState.newTodo}
          setNewTodo={(text) => setTodoState((prevState) => ({ ...prevState, newTodo: text }))}
          addTodo={addTodo}
          filter={todoState.filter}
          setFilter={(filter) => setTodoState((prevState) => ({ ...prevState, filter }))}
        />
        <FlatList
          data={filterTodos()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTodo}
        />
        {/* Delete Confirmation Modal */}
        <DeleteModal
          visible={todoState.isDeleteModalVisible}
          onCancel={() => setTodoState((prevState) => ({ ...prevState, isDeleteModalVisible: false }))}
          onConfirm={() => {
            deleteTodo(todoState.currentTodoId);
          }}
        />
      </View>
      <SnackBar
        visible={todoState.isSnackbarVisible}
        onDismiss={() => setTodoState((prevState) => ({ ...prevState, isSnackbarVisible: false }))}
        message={todoState.snackbarMessage}
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
