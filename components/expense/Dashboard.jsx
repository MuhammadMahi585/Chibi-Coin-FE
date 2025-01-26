import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DataContext } from "../contexts/DataContext";

export default function Dashboard() {
  const { data } = useContext(DataContext);

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "PKR":
        return "₨";
      case "USD":
      default:
        return "$";
    }
  };

  const currencySymbol = data.user
    ? getCurrencySymbol(data.user.currency)
    : "$";

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.title}>Your Balance</Text>
        <Text style={styles.balance}>
          {currencySymbol}{" "}
          {data.user.balance !== undefined && !isNaN(data.user.balance)
            ? data.user.balance.toFixed(2)
            : "0.00"}{" "}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.metric}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Income</Text>
              <Text style={styles.metricValue}>
                {currencySymbol}{" "}
                {data.user.income !== undefined && !isNaN(data.user.income)
                  ? data.user.income.toFixed(2)
                  : "0.00"}
              </Text>
            </View>
            <Icon
              name="arrow-up"
              color="#2BCB79"
              size={25}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.metric}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Expense</Text>
              <Text style={styles.metricValue}>
                {currencySymbol}{" "}
                {data.user.expense !== undefined && !isNaN(data.user.expense)
                  ? data.user.expense.toFixed(2)
                  : "0.00"}
              </Text>
            </View>
            <Icon
              name="arrow-down"
              color="#FF0000"
              size={25}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginBottom: 16,
    alignItems: "center",
  },
  balanceContainer: {
    marginBottom: 16,
    alignItems: "flex-start", // Justify balance to the left
    width: "100%",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "left",
    letterSpacing: 1,
    color: "#fff", // Set text color to white
  },
  balance: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff", // Set text color to white
    letterSpacing: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  metric: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff", // Set background color to white
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  metricContent: {
    flexDirection: "row", // Align items in a row
    alignItems: "center",
    justifyContent: "space-between", // Ensure space between text and icon
    width: "100%",
  },
  icon: {
    marginLeft: 8, // Add some space between the text and the icon
  },
  metricLabel: {
    fontSize: 18,
    color: "#000", // Set text color to black
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000", // Set text color to black
    letterSpacing: 1,
  },
});
