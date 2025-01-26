import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TransactionHeader = ({
  onClose,
  title,
  handleKeyPress,
  close = false,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onClose}>
        <Icon name={close ? "close" : "arrow-left"} size={28} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={() => handleKeyPress("")}>
        <Icon name="check" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2BCB79",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default TransactionHeader;
