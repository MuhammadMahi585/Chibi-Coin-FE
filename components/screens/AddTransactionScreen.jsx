import React, { useState, useCallback, useContext } from "react";
import { View, StyleSheet, Dimensions, Text, Animated } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useFocusEffect } from "@react-navigation/native";

import DefaultLayout from "../layout/DefaultLayout";
import Header from "../expense/add/TransactionHeader";
import Type from "../expense/add/TransactionType";
import AmountInput from "../expense/add/AmountInput";
import Category from "../expense/add/CategorySelector";
import NumberPad from "../expense/add/NumberPad";
import TransactionDetails from "../expense/add/TransactionDetails";
import { DataContext } from "../contexts/DataContext";

const AddTransactionScreen = ({ navigation }) => {
  const { data, addTransaction } = useContext(DataContext);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food and Drinks");
  const [currency, setCurrency] = useState(data.user?.currency || "USD");
  const [date, setDate] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [index, setIndex] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const resetStates = () => {
    setAmount("");
    setNotes("");
    setType("expense");
    setCategory("Food and Drinks");
    setCurrency(data.user?.currency || "USD");
    setDate(new Date());
    setIsRecurring(false);
    setFrequency("daily");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleKeyPress = (value) => {
    if (value === "x") {
      setAmount(amount.slice(0, -1)); // Remove last character
    } else {
      setAmount(amount + value);
    }
  };

  const handleCheckPress = () => {
    if (amount === "") {
      setAlertVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setAlertVisible(false));
        }, 1000);
      });
    } else {
      addTransaction({
        name: category,
        amount: parseFloat(amount),
        currency,
        type: type === "expense" ? "deducted" : "added",
        date,
        notes,
        category,
        isRecurring,
        frequency,
        startDate,
        endDate,
      });
      resetStates();
      navigation.goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Reset all states and set index to 0 when the screen comes into focus
      resetStates();
      setIndex(0);
    }, [data.user?.currency])
  );

  const FirstRoute = () => (
    <View style={styles.scene}>
      <Header
        onClose={() => navigation.goBack()}
        title="Add Transaction"
        handleKeyPress={handleCheckPress}
        close={true}
      />
      <Type type={type} setType={setType} />
      <View style={styles.temp}>
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          currency={currency}
          setCurrency={setCurrency}
          type={type}
          setIndex={setIndex} // Pass setIndex to AmountInput
        />
        <View>
          <Category category={category} setCategory={setCategory} />
          <NumberPad handleKeyPress={handleKeyPress} />
          {alertVisible && (
            <Animated.View style={[styles.alert, { opacity: fadeAnim }]}>
              <Text style={styles.alertText}>Please fill in the form</Text>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.scene}>
      <Header
        onClose={() => setIndex(0)}
        title={`${currency} ${amount ? amount : "0"}`}
        handleKeyPress={handleCheckPress}
      />
      <TransactionDetails
        notes={notes}
        setNotes={setNotes}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
        isRecurring={isRecurring}
        setIsRecurring={setIsRecurring}
        frequency={frequency}
        setFrequency={setFrequency}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {alertVisible && (
        <Animated.View style={[styles.alert, { opacity: fadeAnim }]}>
          <Text style={styles.alertText}>Please fill in the form</Text>
        </Animated.View>
      )}
    </View>
  );

  const initialLayout = { width: Dimensions.get("window").width };

  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <DefaultLayout>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={() => null} // Hide the tab bar
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  temp: {
    flex: 1,
    justifyContent: "space-between",
  },
  alert: {
    position: "absolute",
    left: "50%",
    top: "85%",
    transform: [
      { translateX: -Dimensions.get("window").width * 0.25 },
      { translateY: -50 },
    ],
    width: "50%",
    backgroundColor: "#fa5252",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddTransactionScreen;
