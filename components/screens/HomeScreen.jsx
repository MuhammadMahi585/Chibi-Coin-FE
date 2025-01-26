import React, { useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar, // Import StatusBar
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useFocusEffect } from "@react-navigation/native";
import Dashboard from "../expense/Dashboard";
import RecentTransactions from "../expense/RecentTransactions";
import UpcomingTransactions from "../expense/UpcomingTransactions";
import DefaultLayout from "../layout/HomeLayout";
import { DataContext } from "../contexts/DataContext";

const initialLayout = { width: Dimensions.get("window").width };

export default function HomeScreen({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "recent", title: "Recent Transactions" },
    { key: "upcoming", title: "Upcoming Transactions" },
  ]);
  const { data, fetchHomePageData } = useContext(DataContext);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        await fetchHomePageData(data.user._id);
      }

      fetchData();
    }, [])
  );

  const renderScene = SceneMap({
    recent: RecentTransactions,
    upcoming: UpcomingTransactions,
  });

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: index * ((Dimensions.get("window").width - 32) / 2),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const CustomTabBar = ({ navigationState, setIndex }) => {
    return (
      <View style={styles.customTabBar}>
        <Animated.View
          style={[
            styles.switchIndicator,
            {
              transform: [{ translateX }],
            },
          ]}
        />
        {navigationState.routes.map((route, i) => (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => setIndex(i)}
          >
            <Text
              style={[
                styles.tabLabel,
                index === i ? styles.activeTabLabel : styles.inactiveTabLabel,
              ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <DefaultLayout>
      <StatusBar barStyle="light-content" backgroundColor="#000" />{" "}
      {/* Add StatusBar */}
      <Dashboard />
      <View style={styles.accounts}>
        <Text style={styles.TitleText}>Accounts</Text>
        <CustomTabBar navigationState={{ index, routes }} setIndex={setIndex} />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={() => null} // Hide the default tab bar
        />
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  accounts: {
    flex: 1,
    backgroundColor: "#f2fff1",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 16,
  },
  TitleText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#000",
    marginVertical: 10,
  },
  customTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2BCB79",
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    position: "relative",
    paddingHorizontal: 0,
  },
  switchIndicator: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#1E9E5F",
    borderRadius: 20,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeTabLabel: {
    color: "#fff", // White color for active tab
  },
  inactiveTabLabel: {
    color: "#eee", // Grey color for inactive tab
  },
});
