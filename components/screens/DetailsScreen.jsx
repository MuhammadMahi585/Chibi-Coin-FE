import React, { useContext, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import DefaultLayout from "../layout/DefaultLayout";
import Titlebar from "../layout/Titlebar";
import Footer from "../layout/Footer";
import BudgetBox from "../budget/BudgetBox";
import GoalBox from "../goals/GoalBox";
import { DataContext } from "../contexts/DataContext";

export default function DetailsScreen() {
  const { data, fetchBudgetsGoalsData } = useContext(DataContext);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        await fetchBudgetsGoalsData(data.user._id);
      }

      fetchData();
    }, [])
  );

  return (
    <DefaultLayout>
      <Titlebar title="Budgets & Goals" />
      <View style={styles.temp}>
        <View style={styles.color}>
          <ScrollView
            style={styles.page} // Wrapper scrollable style
            contentContainerStyle={styles.container} // Proper layout alignment
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.subContainer}>
              <BudgetBox />
              <GoalBox />
            </View>
          </ScrollView>
          <Footer />
        </View>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  temp: {
    flex: 1,
    backgroundColor: "#2BCB79",
  },
  color: {
    flex: 1,
    backgroundColor: "#f2fff1",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  subContainer: {
    width: "100%",
    gap: 20, // Space between BudgetBox and GoalBox
    marginBottom: 70,
  },
});
