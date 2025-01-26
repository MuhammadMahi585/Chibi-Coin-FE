import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataContext } from "../contexts/DataContext";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const BalanceScreen = () => {
  const { data } = useContext(DataContext);

  const balanceInPKR = data.recentTransactions
    .filter((transaction) => transaction.currency === "PKR")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balanceInUSD = data.recentTransactions
    .filter((transaction) => transaction.currency === "USD")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const barData = {
    labels: ["PKR", "USD"],
    datasets: [
      {
        data: [balanceInPKR, balanceInUSD],
      },
    ],
  };

  const lineData = {
    labels: data.balanceHistory.map((entry) => entry.date),
    datasets: [
      {
        data: data.balanceHistory.map((entry) => entry.balance),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Balance Analytics</Text>
      <Text style={styles.subHeader}>Balance in PKR and USD</Text>
      <BarChart
        data={barData}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
      <Text style={styles.subHeader}>Balance History Trends</Text>
      <LineChart
        data={lineData}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  chart: {
    marginVertical: 8,
  },
});

export default BalanceScreen;
