import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AmountInput = ({
  amount,
  setAmount,
  currency,
  setCurrency,
  type,
  setIndex,
}) => {
  const [fontSize, setFontSize] = useState(106); // Default font size
  const windowWidth = useWindowDimensions().width;
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    // Adjust font size dynamically based on amount length and container width
    const threshold = 3; // Number of digits before decreasing font size
    const newFontSize =
      amount.length > threshold
        ? Math.max(32, 106 - (amount.length - threshold) * 15) // Decrease by 8 for each additional digit
        : 106;
    setFontSize(newFontSize);
  }, [amount, windowWidth]);

  const handleKeyPress = (value) => {
    if (value === "x") {
      setAmount(amount.slice(0, -1)); // Remove last character
    } else if (amount.length < 11) {
      setAmount(amount + value);
    }
  };

  const symbol = type === "expense" ? "minus" : "plus";
  const symbolColor = type === "expense" ? "#FF0000" : "#2BCB79";

  return (
    <View style={styles.container}>
      <Icon name={symbol} size={40} color={symbolColor} style={styles.symbol} />

      <TextInput
        style={[styles.amountInput, { fontSize }]} // Apply dynamic font size
        value={amount}
        placeholder="0"
        placeholderTextColor="#C1C1C1"
        keyboardType="numeric"
        editable={false}
      />
      <TouchableOpacity
        style={styles.currencyButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.currencyText}>{currency}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.arrow} onPress={() => setIndex(1)}>
        <Icon name="arrow-left" size={16} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            <View style={styles.currencyOptions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setCurrency("PKR");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>PKR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setCurrency("USD");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>USD</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.currencyOptions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxHeight: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingRight: 35,
    backgroundColor: "#FFF",
  },
  arrow: {
    width: 25,
    height: 90,
    backgroundColor: "#16B773",
    position: "absolute",
    top: 85,
    right: 0,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 2,
  },
  symbol: {
    marginRight: 10,
    position: "relative",
    top: -0,
  },
  currencyButton: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#16B773",
    borderRadius: 20,
    marginLeft: 10,
    position: "relative",
    top: -0,
  },
  currencyText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  amountInput: {
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "right",
    overflow: "scroll",
    position: "relative",
    top: -0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  currencyOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2BCB79",
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#fa5252",
  },
  modalButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default AmountInput;
