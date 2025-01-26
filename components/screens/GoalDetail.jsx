import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert, // Import Alert
} from "react-native";
import { DataContext } from "../contexts/DataContext";
import { formatDate } from "../utils/dateUtils";
import { ProgressCircle } from "react-native-svg-charts";
import { formatCurrency } from "../utils/currencyUtils";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";
import { useNavigation } from "@react-navigation/native";

const formatWithCommas = (value) => {
  const numericValue = value.replace(/[^\d]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function GoalDetail({ route }) {
  const { goal } = route.params;
  const { data, updateGoal, deleteGoal } = useContext(DataContext); // Assuming deleteGoal is provided by the context
  const [currentGoal, setCurrentGoal] = useState(goal);
  const [amountToAdd, setAmountToAdd] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const updatedGoal = data.goals.find((g) => g._id === goal._id);
    if (updatedGoal) {
      setCurrentGoal(updatedGoal);
    }
  }, [data.goals, goal._id]);

  const handleAddAmount = () => {
    const amount = parseFloat(amountToAdd.replace(/,/g, ""));
    if (!isNaN(amount) && amount > 0) {
      updateGoal(goal._id, amount);
      setAmountToAdd("");
    }
  };

  const handleInputChange = (text) => {
    const formattedValue = formatWithCommas(text);
    setAmountToAdd(formattedValue);
  };

  const handleGoalCompletion = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to mark this goal as reached? This will delete the goal.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteGoal(goal._id);
            navigation.navigate("Details");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const progress = (currentGoal.saved / currentGoal.target) * 100;

  return (
    <DefaultLayout>
      <Backbar name={`${currentGoal.name} Details`} url="Details" />
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={styles.progressCircleContainer}>
            <ProgressCircle
              style={styles.progressCircle}
              progress={currentGoal.saved / currentGoal.target}
              progressColor={"#2BCB79"}
              strokeWidth={20}
            />
            <View style={styles.percentageContainer}>
              <Text style={styles.progressPercentage}>
                {Math.round(progress)}%
              </Text>
            </View>
          </View>
          <Text style={styles.amountText}>
            {formatCurrency(currentGoal.saved)} PKR /{" "}
            {formatCurrency(currentGoal.target)} PKR
          </Text>
        </View>
        <View style={styles.detailTextContainer}>
          <Text style={styles.detailText}>Desired Date:</Text>
          <Text style={styles.dateText}>
            {formatDate(currentGoal.desiredDate)}
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Amount to Add"
          value={amountToAdd}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddAmount}>
          <Text style={styles.buttonText}>Add Amount</Text>
        </TouchableOpacity>

        {/* Button to mark the goal as reached */}
        <TouchableOpacity style={styles.button} onPress={handleGoalCompletion}>
          <Text style={styles.buttonText}>Set Goal as Reached</Text>
        </TouchableOpacity>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120,
    backgroundColor: "#f1f1f1",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressCircleContainer: {
    position: "relative",
    alignItems: "center",
  },
  progressCircle: {
    height: 150,
    width: 150,
  },
  percentageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2BCB79",
  },
  amountText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    color: "#333",
  },
  detailTextContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#f9f9f9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    borderRadius: 4,
    elevation: 1,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "400",
    lineHeight: 18,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 4,
  },
  input: {
    height: 45,
    borderColor: "#2BCB79",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#2BCB79",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
