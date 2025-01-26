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

export default function BudgetBox() {
  const { data } = useContext(DataContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgets</Text>
      <Text style={styles.subtitle}>
        How much I can spend to meet my budget?
      </Text>

      <FlatList
        data={data.budget}
        keyExtractor={(item) =>
          item._id ? item._id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => {
          const spent = item.spent || 0;
          const amount = item.amount || 1;
          const progress = Number(
            parseFloat(Math.min(Math.max(spent / amount, 0), 1)).toFixed(2)
          ); // Ensure progress is between 0 and 1
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BudgetDetail", {
                  budgetItem: {
                    ...item,
                    date: item.date ? item.date.toISOString() : null,
                  },
                })
              }
            >
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{item.name}</Text>
                <View style={styles.budgetRow}>
                  <Text style={styles.budgetText}>{item.name} budget</Text>
                  <Text style={styles.amount}>
                    {formatCurrency(item.spent)} / {formatCurrency(item.amount)}{" "}
                    PKR
                  </Text>
                </View>
                <ProgressBar progress={progress} color="#34c759" />
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate("CreateBudget")}>
        <Text style={styles.createBudgetButton}>CREATE BUDGET</Text>
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
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34c759",
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
    color: "#34c759",
    marginBottom: 8,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  budgetText: {
    fontSize: 14,
    color: "#333",
  },
  amount: {
    fontSize: 14,
    color: "#333",
  },
  createBudgetButton: {
    fontSize: 14,
    color: "#34c759",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
});
