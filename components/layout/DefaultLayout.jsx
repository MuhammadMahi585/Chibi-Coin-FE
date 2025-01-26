// src/components/DefaultLayout.jsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DefaultLayout({ children }) {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 5,
  },
});
