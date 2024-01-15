1. loadTodos function:
This function is responsible for loading the TODOs from AsyncStorage when the component mounts.
It uses AsyncStorage.getItem to retrieve the stored TODOs.
If there are stored TODOs, it parses the JSON data and sets them using setTodos.
Any errors that occur during this process are logged to the console.

------------------------------------------------------------------------------------------

2. useEffect hook:
The useEffect hook is used to run the loadTodos function when the component mounts.
This ensures that the TODOs are loaded from AsyncStorage when the app starts.

------------------------------------------------------------------------------------------

3. saveTodos function:
This function is responsible for saving the TODOs to AsyncStorage.
It uses AsyncStorage.setItem to store the TODOs after converting them to a JSON string.
Any errors during the saving process are logged to the console.

------------------------------------------------------------------------------------------

4. addTodo function:
This function is called when the user wants to add a new TODO.
It creates a new TODO object with a unique ID, the text from the newTodo state, and initially sets completed to false.
It then updates the todos state by adding the new TODO to the existing list.
The newTodo state is then reset to an empty string.
Finally, it calls saveTodos to persist the updated TODOs.

------------------------------------------------------------------------------------------

5. toggleTodo function:
This function is called when the user toggles the completion status of a TODO.
It maps over the existing TODOs, toggles the completed property for the specified TODO, and returns a new array of updated TODOs.
The state is then updated with the new array of TODOs, and saveTodos is called to persist the changes.

------------------------------------------------------------------------------------------

6. editTodo function:
This function is called when the user wants to edit a TODO.
It sets the editingTodoId state to the ID of the TODO being edited and initializes the editingTodoText state with the current text of the TODO.

------------------------------------------------------------------------------------------

7. saveEditedTodo function:
This function is called when the user saves the edited text of a TODO.
It maps over the existing TODOs, updates the text for the specified TODO using the editingTodoText state, and returns a new array of updated TODOs.
The editingTodoId state is reset to null, and the editingTodoText state is reset to an empty string.
The state is then updated with the new array of TODOs, and saveTodos is called to persist the changes.

------------------------------------------------------------------------------------------

8. deleteTodo function:
This function is called when the user wants to delete a TODO.
It filters out the TODO with the specified ID, creating a new array without that TODO.
The state is then updated with the new array of TODOs, and saveTodos is called to persist the changes.

------------------------------------------------------------------------------------------

9. renderTodo function:
This function is used as the renderItem prop for the FlatList.
It renders a TodoItem component, passing various props to manage the interaction with individual TODO items.

------------------------------------------------------------------------------------------

10. filterTodos function:
This function filters the TODOs based on the current filter (all, done, undone).
It uses the filter state to determine which TODOs to include in the filtered list.
The function returns a new array of TODOs based on the filter.
return statement:
The return statement renders the main structure of the TodoApp component.
It includes the TodoHeader component, passing necessary props for adding new TODOs and setting the filter.
The FlatList renders the TODO items, and it filters the list using the filterTodos function.