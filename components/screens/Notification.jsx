import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { DataContext } from "../contexts/DataContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { getBudget } from "../../api/services/budgetService";
import { editNotification } from "../../api/services/notificationService";

export default function Notifications() {
  const { data, fetchNotificationsData } = useContext(DataContext);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        await fetchNotificationsData(data.user._id);
      }

      fetchData();
    }, [])
  );

  const handleNotificationPress = async (destinationUrl) => {
    const [route, id] = destinationUrl.split("/").slice(-2);
    if (route === "budgets") {
      const budgetItem = await getBudget(id);
      const budgetData = budgetItem.data;
      if (budgetData) {
        navigation.navigate("BudgetDetail", { budgetItem: budgetData });
      } else {
        console.log("Budget item not found");
      }
    }
    // Add more conditions if there are other types of notifications
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={data.notifications}
        keyExtractor={(item) =>
          item._id ? item._id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notification}
            onPress={async () => {
              if (!item.isRead) {
                item.isRead = true;
                await editNotification(item._id, item);
              }
              handleNotificationPress(item.destinationUrl);
            }}
          >
            {!item.isRead && <View style={styles.greenDot} />}
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDetails}>{item.details}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  notification: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationDetails: {
    fontSize: 14,
    color: "#666",
  },
});
