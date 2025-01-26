// // src/screens/FullPage.js
// import React, { useContext } from "react";
// import { StyleSheet, ScrollView, View } from "react-native";
// import { DataContext } from "../contexts/DataContext";
// import Balance from "./Dashboard";
// import Metrics from "./Metrics";
// import RecentTransactions from "./RecentTransactions";
// import UpcomingExpenses from "./UpcomingExpenses";

// export default function FullPage() {
//   const { data } = useContext(DataContext);
//   const { balance, income, expense, recentTransactions, upcomingExpenses } =
//     data;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.dashboard}>
//         <Balance balance={balance} />
//         <Metrics income={income} expense={expense} />
//       </View>
//       <RecentTransactions transactions={recentTransactions} />
//       <UpcomingExpenses expenses={upcomingExpenses} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#21CE99",
//   },
//   dashboard: {
//     // flexGrow: 1,
//     padding: 16,
//     backgroundColor: "#34c759",
//     marginBottom: 16,
//     borderRadius: 10,
//     color: "#fff",
//   },
// });
