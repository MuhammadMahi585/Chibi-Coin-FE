import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { DataContext } from "../contexts/DataContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UpcomingTransactions() {
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

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.section}>
        {data.upcomingTransactions && data.upcomingTransactions.length > 0 ? (
          data.upcomingTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transaction}>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <View style={styles.dateContainer}>
                  <Icon name="calendar" size={16} color="#666" />
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.transactionAmount}>
                  {getCurrencySymbol(transaction.currency)}{" "}
                  {transaction.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactionsText}>
            No upcoming transactions
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginBottom: 50,
  },
  section: {
    flex: 1,
    marginBottom: 16,
    gap: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    borderLeftWidth: 5,
    borderLeftColor: "#fa5252", // Red for upcoming transactions
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  amountAndDate: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4, // Add some space between the name and the date
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
});
