// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useNavigationState } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(
    (state) => state.routes[state.index].name
  );
  const [activeRoute, setActiveRoute] = useState(currentRouteName);

  useEffect(() => {
    setActiveRoute(currentRouteName);
  }, [currentRouteName]);

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.iconContainer}
      >
        <Icon
          name="home"
          color={activeRoute === "Home" ? "#2BCB79" : "#fff"} // Change color if focused
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddTransaction")}
        style={styles.addContainer}
      >
        <Icon
          name="plus-circle"
          color={activeRoute === "AddTransaction" ? "#2BCB79" : "#fff"} // Change color if focused
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details")}
        style={styles.iconContainer}
      >
        <Icon
          name="details"
          color={activeRoute === "Details" ? "#2BCB79" : "#fff"} // Change color if focused
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  iconContainer: {
    padding: 5, // Increase the touchable area
  },
  addContainer: {
    padding: 0, // Increase the touchable area
  },
});
