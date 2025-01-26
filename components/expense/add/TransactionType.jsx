import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TransactionType = ({ type, setType }) => {
  return (
    <View style={styles.typeContainer}>
      <TouchableOpacity
        style={[styles.typeButton, type === "expense" && styles.selectedType]}
        onPress={() => setType("expense")}
      >
        <Text
          style={[
            styles.typeText,
            type === "expense" && styles.selectedTypeText,
          ]}
        >
          Expense
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.typeButton, type === "income" && styles.selectedType]}
        onPress={() => setType("income")}
      >
        <Text
          style={[
            styles.typeText,
            type === "income" && styles.selectedTypeText,
          ]}
        >
          Income
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  typeContainer: {
    flexDirection: "row",
  },
  typeButton: {
    width: "50%",
    padding: 16,
    backgroundColor: "#16B773",
  },
  selectedType: {
    backgroundColor: "#008256",
  },
  typeText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedTypeText: {
    color: "#FFF",
  },
});

export default TransactionType;
