import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { DataContext } from "../contexts/DataContext";
import { useNavigation } from "@react-navigation/native";
import { formatCurrency } from "../utils/currencyUtils"; // Import the utility function

export default function GoalBox() {
  const { data } = useContext(DataContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals</Text>
      <Text style={styles.subtitle}>
        How much I have saved towards my goals?
      </Text>

      <FlatList
        data={data.goals}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          const progress = parseFloat(
            Math.min(Math.max(item.saved / item.target, 0), 1).toFixed(2)
          );
          return (
            <TouchableOpacity
              style={styles.section}
              onPress={() => navigation.navigate("GoalDetail", { goal: item })}
            >
              <Text style={styles.sectionTitle}>{item.name}</Text>
              <View style={styles.goalRow}>
                <Text style={styles.goalText}>{item.name} goal</Text>
                <Text style={styles.amount}>
                  {formatCurrency(item.saved)} / {formatCurrency(item.target)}{" "}
                  PKR
                </Text>
              </View>
              <ProgressBar progress={progress} color="#34c759" />
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate("CreateGoal")}>
        <Text style={styles.createGoalButton}>CREATE GOAL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34c759", // Green title
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34c759", // Green section title
    marginBottom: 8,
  },
  goalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  goalText: {
    fontSize: 14,
    color: "#333",
  },
  amount: {
    fontSize: 14,
    color: "#333",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
  },
  createGoalButton: {
    fontSize: 14,
    color: "#34c759",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
});
