import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { DataContext } from "../contexts/DataContext";
import { formatDate } from "../utils/dateUtils";
import { formatCurrency } from "../utils/currencyUtils";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function BudgetDetail({ route }) {
  const { budgetItem } = route.params;
  const { deleteBudget } = useContext(DataContext);
  const navigation = useNavigation();

  if (!budgetItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Budget item not accessible.</Text>
      </View>
    );
  }

  const remainingAmount = budgetItem.amount - budgetItem.spent;
  const spentPercentage = (budgetItem.spent / budgetItem.amount) * 100;

  const handleDeleteBudget = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this budget?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteBudget(budgetItem._id);
            navigation.navigate("Details");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DefaultLayout>
      <Backbar name={`${budgetItem.name} Details`} url="Details" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Total Amount:</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(budgetItem.amount)} PKR
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Amount Spent:</Text>
            <Text style={styles.spentValue}>
              {formatCurrency(budgetItem.spent)} PKR
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Remaining:</Text>
            <Text style={styles.remainingValue}>
              {formatCurrency(remainingAmount)} PKR
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${spentPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(spentPercentage)}% Spent
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{budgetItem.duration}</Text>
          </View>

          {budgetItem.categories && budgetItem.categories.length > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Categories:</Text>
              <Text style={styles.value}>
                {budgetItem.categories.join(", ")}
              </Text>
            </View>
          )}

          {budgetItem.startDate && budgetItem.endDate && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date Range:</Text>
              <Text style={styles.value}>
                {formatDate(budgetItem.startDate)} -{" "}
                {formatDate(budgetItem.endDate)}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleDeleteBudget}>
          <Text style={styles.buttonText}>Delete Budget</Text>
        </TouchableOpacity>
      </ScrollView>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F1F8E9",
    flexGrow: 1,
    justifyContent: "center", // Center content vertically
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
    width: width * 0.95,
    alignSelf: "center",
    marginTop: 30, // Added margin to move the card down
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  spentValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fa5252",
  },
  remainingValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2BCB79",
  },
  progressContainer: {
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 20,
    width: "100%",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2BCB79",
  },
  progressText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#fa5252",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.95,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
