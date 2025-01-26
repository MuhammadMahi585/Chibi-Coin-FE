import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CategorySelector = ({ category, setCategory }) => {
  const categories = [
    "Food and Drinks",
    "Shopping",
    "Transportation",
    "Studies",
    "Others",
  ];

  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "column",
    backgroundColor: "#ccc",
    paddingVertical: 4,
    color: "#000",
  },
  picker: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 30,
  },
});

export default CategorySelector;
