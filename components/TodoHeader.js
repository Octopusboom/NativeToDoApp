import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import AddButton from "./AddButton";
import FilterTasks from "./FilterTasks";
import Quotes from "./Quotes";
const TodoHeader = ({ newTodo, setNewTodo, addTodo, filter, setFilter }) => {
  // If the input is empty of white spaces, send the prop to disable the button
  const isAddButtonDisabled = newTodo.trim() === "";

  return (
    <View style={{flexDirection: "column"}}>
    <Quotes />
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.AddInput}
          placeholder="Add a todo..."
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <AddButton onPress={addTodo} disabled={isAddButtonDisabled} />
      </View>
      <FilterTasks activeFilter={filter} setFilter={setFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  AddInput: {
    borderRadius: 25,
    padding: 15,
    backgroundColor: "#EBF1F5",
    color: "#696A80",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
});

export default TodoHeader;