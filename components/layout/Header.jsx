import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../contexts/DataContext";

export default function Header() {
  const navigation = useNavigation();
  const { data } = useContext(DataContext);

  const renderUsername = () => {
    const username = data.user?.name || "Hello";
    if (username.length > 16) {
      return "Welcome";
    } else if (username.length >= 10 && username.length <= 16) {
      return username;
    } else {
      return `Welcome ${username}`;
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.navigate("User")}
        style={styles.iconContainer}
      >
        {data.user?.imageUri ? (
          <Image
            source={{ uri: data.user.imageUri }}
            style={styles.avatarImage}
          />
        ) : (
          <Icon name="account" color="#fff" size={30} />
        )}
      </TouchableOpacity>
      <Text style={styles.username}>{renderUsername()}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Notifications")}
        style={styles.iconContainer}
      >
        <Icon name="bell" color="#fff" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  iconContainer: {
    padding: 10, // Increase the touchable area
  },
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "cover",
  },
  username: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
