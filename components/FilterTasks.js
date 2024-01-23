import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FilterTasks = ({ activeFilter, setFilter }) => {
  const isAllActive = activeFilter === "all";
  const isDoneActive = activeFilter === "done";
  const isUndoneActive = activeFilter === "undone";

  return (
    <View style={styles.filterButtons}>
      <TouchableOpacity
        style={[styles.filterButton, isAllActive && styles.activeFilter]}
        onPress={() => setFilter("all")}
      >
        <Text
          style={[styles.buttonText, isAllActive && styles.activeButtonText]}
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterButton, isUndoneActive && styles.activeFilter]}
        onPress={() => setFilter("undone")}
      >
        <Text
          style={[styles.buttonText, isUndoneActive && styles.activeButtonText]}
        >
          Undone
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterButton, isDoneActive && styles.activeFilter]}
        onPress={() => setFilter("done")}
      >
        <Text
          style={[styles.buttonText, isDoneActive && styles.activeButtonText]}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EBF1F5"
  },
  filterButton: {
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#EBF1F5",
    flex: 1,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: "#3C79B0",
  },
  buttonText: {
    color: "#696A80",
    textAlign: "center",
  },
  activeButtonText: {
    color: "#fff",
  },
});

export default FilterTasks;
