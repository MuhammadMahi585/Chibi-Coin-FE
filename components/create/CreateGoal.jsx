import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { DataContext } from "../contexts/DataContext";
import { formatDate } from "../utils/dateUtils";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";

const formatWithCommas = (value) => {
  const numericValue = value.replace(/[^\d]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function CreateGoal() {
  const { addGoal } = useContext(DataContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [desiredDate, setDesiredDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    target: false,
    saved: false,
  });

  // Reset fields and errors when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setName("");
      setTarget("");
      setSaved("");
      setDesiredDate(new Date());
      setErrors({ name: false, target: false, saved: false }); // Reset errors
    }, [])
  );

  const handleInputChange = (text, setter) => {
    const formattedValue = formatWithCommas(text);
    setter(formattedValue);
  };

  const handleSave = () => {
    let valid = true;
    const newErrors = { name: false, target: false, saved: false };

    if (!name) {
      newErrors.name = true;
      valid = false;
    }
    if (!target) {
      newErrors.target = true;
      valid = false;
    }
    if (!saved) {
      newErrors.saved = true;
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    const newGoal = {
      name,
      target: parseFloat(target.replace(/,/g, "")), // Remove commas for calculation
      saved: parseFloat(saved.replace(/,/g, "")) || 0,
      desiredDate,
    };

    addGoal(newGoal);

    // Reset fields and errors after saving
    setName("");
    setTarget("");
    setSaved("");
    setDesiredDate(new Date());
    setErrors({ name: false, target: false, saved: false }); // Reset errors

    navigation.navigate("Details");
  };

  return (
    <DefaultLayout>
      <Backbar name="Create Goal" url="Details" close="true" />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Goal Name"
            value={name}
            onChangeText={setName}
          />
          {errors.name && (
            <Text style={styles.errorText}>Please enter a goal name.</Text>
          )}

          <TextInput
            style={[styles.input, errors.target && styles.inputError]}
            placeholder="Target Amount"
            value={target}
            onChangeText={(text) => handleInputChange(text, setTarget)}
            keyboardType="numeric"
          />
          {errors.target && (
            <Text style={styles.errorText}>Please enter a target amount.</Text>
          )}

          <TextInput
            style={[styles.input, errors.saved && styles.inputError]}
            placeholder="Saved Already"
            value={saved}
            onChangeText={(text) => handleInputChange(text, setSaved)}
            keyboardType="numeric"
          />
          {errors.saved && (
            <Text style={styles.errorText}>Please enter the saved amount.</Text>
          )}

          {/* Desired Date Section */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Desired Date</Text>
            <TouchableOpacity
              style={[styles.input, styles.readOnlyInput]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.inputText}>
                {formatDate(desiredDate) || "Select a date"}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={desiredDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setDesiredDate(date);
              }}
            />
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F6F8FA",
  },
  input: {
    height: 50,
    borderColor: "#D1D9E6",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  inputError: {
    borderColor: "red", // Red border color on error
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 15,
  },
  readOnlyInput: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
    color: "#555",
  },
  dateButton: {
    backgroundColor: "#2BCB79",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  dateButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedDate: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveBtn: {
    backgroundColor: "#2BCB79",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});
