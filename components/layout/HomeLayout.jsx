// src/components/DefaultLayout.jsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.main}>
        <Header />

        {children}
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  main: {
    flex: 1,
    backgroundColor: "#2BCB79",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 5,
  },
});
