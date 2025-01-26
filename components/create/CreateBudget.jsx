import React, { useState, useEffect, useContext } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { DataContext } from "../contexts/DataContext";
import { formatDate } from "../utils/dateUtils";
import { Picker } from "@react-native-picker/picker";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CreateBudget = () => {
  const { addBudget } = useContext(DataContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("Week");
  const [categories, setCategories] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      setName("");
      setAmount("");
      setDuration("Week");
      setCategories([]);
      setStartDate(new Date());
      setEndDate(new Date());
      setErrors({});
    }, [])
  );

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Budget name is required.";
    if (!amount.trim()) newErrors.amount = "Budget amount is required.";
    if (categories.length === 0)
      newErrors.categories = "At least one category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateFields()) {
      const newBudget = {
        name,
        amount: parseFloat(amount.replace(/,/g, "")),
        spent: 0,
        duration,
        categories,
        ...(duration === "one-time" && { startDate, endDate }),
      };
      await addBudget(newBudget);
      navigation.navigate("Details");
    } else {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        Alert.alert("Validation Error", errors[firstErrorField]);
      }
    }
  };

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const formatWithCommas = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (text) => {
    const formattedValue = formatWithCommas(text);
    setAmount(formattedValue);
  };

  return (
    <DefaultLayout>
      <Backbar name="Create Budget" url="Details" close="true" />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            style={[styles.input, errors.name && { borderColor: "red" }]}
            placeholder="Budget Name"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <TextInput
            style={[styles.input, errors.amount && { borderColor: "red" }]}
            placeholder="Budget Amount"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}
          <Text style={styles.label}>Duration</Text>
          <Picker
            selectedValue={duration}
            style={styles.picker}
            onValueChange={(itemValue) => setDuration(itemValue)}
          >
            <Picker.Item label="Week" value="Week" />
            <Picker.Item label="Month" value="Month" />
            <Picker.Item label="Year" value="Year" />
            <Picker.Item label="One-Time" value="One-Time" />
          </Picker>
          {/* Inside the JSX of the CreateBudget component */}
          {duration === "One-Time" && (
            <>
              <View style={styles.dateFieldsContainer}>
                <View style={styles.dateFieldWrapper}>
                  <Text style={styles.dateLabel}>Start Date</Text>
                  <TouchableOpacity
                    style={styles.dateField}
                    onPress={() => setShowStartDatePicker(true)}
                  >
                    <Text style={styles.dateFieldText}>
                      {startDate ? formatDate(startDate) : "Select Start Date"}
                    </Text>
                  </TouchableOpacity>
                  {showStartDatePicker && (
                    <DateTimePicker
                      value={startDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        setShowStartDatePicker(false);
                        if (date) setStartDate(date);
                      }}
                    />
                  )}
                </View>
                <View style={styles.dateFieldWrapper}>
                  <Text style={styles.dateLabel}>End Date</Text>
                  <TouchableOpacity
                    style={styles.dateField}
                    onPress={() => setShowEndDatePicker(true)}
                  >
                    <Text style={styles.dateFieldText}>
                      {endDate ? formatDate(endDate) : "Select End Date"}
                    </Text>
                  </TouchableOpacity>
                  {showEndDatePicker && (
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        setShowEndDatePicker(false);
                        if (date) setEndDate(date);
                      }}
                    />
                  )}
                </View>
              </View>
            </>
          )}

          <Text style={styles.label}>Categories</Text>
          {errors.categories && (
            <Text style={styles.errorText}>{errors.categories}</Text>
          )}
          {[
            { name: "Food and Drinks", icon: "food" },
            { name: "Shopping", icon: "cart" },
            { name: "Transportation", icon: "bus" },
            { name: "Studies", icon: "school" },
            { name: "Others", icon: "dots-horizontal" },
          ].map((category) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.chip,
                categories.includes(category.name) && styles.chipSelected,
              ]}
              onPress={() => handleCategoryChange(category.name)}
            >
              <Icon
                name={category.icon}
                size={18}
                color={categories.includes(category.name) ? "#347AF0" : "#555"}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.chipText,
                  categories.includes(category.name) && styles.chipTextSelected,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefaultLayout>
  );
};

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
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  dateFieldsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateFieldWrapper: {
    flex: 1,
    marginRight: 10,
  },
  dateLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
  },
  dateField: {
    height: 50,
    borderColor: "#D1D9E6",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  dateFieldText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  // dateField: {
  //   height: 50,
  //   borderColor: "#D1D9E6",
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   marginBottom: 15,
  //   paddingHorizontal: 15,
  //   justifyContent: "center",
  //   backgroundColor: "#FFF",
  // },
  // dateFieldText: {
  //   fontSize: 16,
  //   color: "#555",
  // },
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
  chip: {
    backgroundColor: "#EFF3F6",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  chipSelected: {
    backgroundColor: "#D1E9FF",
    borderColor: "#347AF0",
  },
  chipText: {
    color: "#555",
    fontSize: 14,
  },
  chipTextSelected: {
    color: "#347AF0",
  },
  icon: {
    marginRight: 8,
  },
});

export default CreateBudget;
