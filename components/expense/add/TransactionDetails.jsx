
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

const TransactionDetails = ({
  notes,
  setNotes,
  category,
  setCategory,
  date,
  setDate,
  isRecurring,
  setIsRecurring,
  frequency,
  setFrequency,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const categories = [
    { label: "Food and Drinks", icon: "cutlery" },
    { label: "Shopping", icon: "shopping-cart" },
    { label: "Transportation", icon: "bus" },
    { label: "Studies", icon: "book" },
    { label: "Others", icon: "ellipsis-h" },
  ];

  const handleSaveNotes = () => {
    setNotes(tempNotes);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notes</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.notesText}>{notes || "Add notes"}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {categories.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.label}
              value={category.label}
              color="#000" // Set text color to black
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Recurring Expense</Text>
        <Switch
          value={isRecurring}
          onValueChange={(value) => setIsRecurring(value)}
          trackColor={{ false: "#767577", true: "#76dbbc" }}
          thumbColor={isRecurring ? "#16B773" : "#f4f3f4"}
        />
      </View>

      {isRecurring && (
        <>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={frequency}
              onValueChange={(itemValue) => setFrequency(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Yearly" value="yearly" />
            </Picker>
          </View>

          <View style={styles.dateRow}>
            <View style={styles.dateColumn}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity
                onPress={() => setShowStartDatePicker(true)}
                style={styles.input}
              >
                <Text style={styles.dateText}>{startDate.toDateString()}</Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="spinner"
                  onChange={handleStartDateChange}
                />
              )}
            </View>

            <View style={styles.dateColumn}>
              <Text style={styles.label}>End Date</Text>
              <TouchableOpacity
                onPress={() => setShowEndDatePicker(true)}
                style={styles.input}
              >
                <Text style={styles.dateText}>{endDate.toDateString()}</Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="spinner"
                  onChange={handleEndDateChange}
                />
              )}
            </View>
          </View>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Notes</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter notes"
              value={tempNotes}
              onChangeText={setTempNotes}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveNotes}
              >
                <Text style={styles.buttonText}>Save</Text>
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
    padding: 20,
    backgroundColor: "#fff",
    color: "#000",
  },
  label: {
    color: "#000",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    backgroundColor: "#eee",
    color: "#000",
    padding: 18,
    marginBottom: 15,
    borderRadius: 5,
  },
  notesText: {
    color: "#000",
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 15,
    color: "#000",
  },
  picker: {
    color: "#000",
  },
  pickerItem: {
    color: "#000", // Set text color to black
  },
  dateText: {
    fontSize: 16, // Increase the font size for the date text
    color: "#000",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  dateColumn: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInput: {
    fontSize: 16,
    backgroundColor: "#eee",
    color: "#000",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
  },
  modalButton: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#fa5252",
  },
  saveButton: {
    backgroundColor: "#2BCB79",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TransactionDetails;
