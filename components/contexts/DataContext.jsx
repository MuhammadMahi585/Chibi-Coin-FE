import React, { createContext, useState } from "react";
import {
  createUser,
  editUser,
  fetchUserBudgets,
  fetchUserGoals,
  fetchUserNotifications,
  fetchUserTransactions,
  getUser,
  getUserFromEmail,
} from "../../api/services/userService";
import {
  createBudget,
  removeBudget,
  editBudget,
} from "../../api/services/budgetService";
import { createTransaction } from "../../api/services/transactionService";
import { createNotification } from "../../api/services/notificationService";
import {
  createGoal,
  editGoal,
  removeGoal,
} from "../../api/services/goalService";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    user: {
      _id: null,
      name: "",
      email: "",
      // password: null,
      currency: "PKR" || "USD",
      imageUri: null,
      balance: 0,
      income: 0,
      expense: 0,
    },
    budget: [],
    goals: [],
    recentTransactions: [],
    upcomingTransactions: [],
    notifications: [],
  });

  // Getting initial data after signin or signup
  const fetchInitialData = async (email) => {
    await getDataAfterAuth(email);
  };

  const getDataAfterAuth = async (email) => {
    const userData = await getUserFromEmail(email);
    setData((prevData) => ({
      ...prevData,
      user: {
        _id: userData.data._id,
        name: userData.data.name,
        email: userData.data.email,
        currency: userData.data.currency,
        imageUri: userData.data.imageUri,
        balance: userData.data.balance,
        income: userData.data.income,
        expense: userData.data.expense,
      },
    }));
  };

  // Get home page data
  const fetchHomePageData = async (id) => {
    fetchUserData(id);
    const transactions = await fetchUserTransactions(id);
    const transactionsData = transactions.data;
    const recentTransactions = transactionsData.filter(
      (transaction) => new Date(transaction.date) <= new Date()
    );
    const totalBalance = recentTransactions.reduce(
      (acc, transaction) =>
        transaction.type == "added"
          ? acc + transaction.amount
          : acc - transaction.amount,
      0
    );

    // Calculating the income and expense for the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthTransactions = recentTransactions.filter(
      (transaction) =>
        new Date(transaction.date).getMonth() == currentMonth &&
        new Date(transaction.date).getFullYear() == currentYear
    );

    const currentMonthIncome = parseFloat(
      currentMonthTransactions
        .reduce(
          (acc, transaction) =>
            transaction.type == "added" ? acc + transaction.amount : acc,
          0
        )
        .toFixed(2)
    );

    const currentMonthExpense = parseFloat(
      currentMonthTransactions
        .reduce(
          (acc, transaction) =>
            transaction.type == "deducted" ? acc + transaction.amount : acc,
          0
        )
        .toFixed(2)
    );

    const newUser = {
      ...data.user,
      balance: totalBalance,
      income: currentMonthIncome,
      expense: currentMonthExpense,
    };

    editUser(data.user._id, newUser);
    const upcomingTransactions = transactionsData.filter(
      (transaction) => new Date(transaction.date) > new Date()
    );

    try {
      const notifications = await fetchNotificationsData(id);
      setData((prevData) => ({
        ...prevData,
        notifications,
      }));
    } catch (error) {
      console.error(error);
    }

    setData((prevData) => ({
      ...prevData,
      user: newUser,
      recentTransactions,
      upcomingTransactions,
    }));

    try {
      await fetchBudgetsGoalsData(id);
    } catch (error) {
      console.error(error);
    }
  };

  // Get user data
  const fetchUserData = async (id) => {
    const userData = await getUser(id);
    setData((prevData) => ({
      ...prevData,
      user: {
        _id: userData.data._id,
        name: userData.data.name,
        email: userData.data.email,
        currency: userData.data.currency,
        imageUri: userData.data.imageUri,
        balance: userData.data.balance,
        income: userData.data.income,
        expense: userData.data.expense,
      },
    }));
  };

  // Get user's notifications
  const fetchNotificationsData = async (id) => {
    const notificationsData = await fetchUserNotifications(id);
    const notifications = notificationsData.data;
    setData((prevData) => ({
      ...prevData,
      notifications,
    }));
  };

  // Get user's budgets and goals
  const fetchBudgetsGoalsData = async (id) => {
    try {
      const budgets = await fetchUserBudgets(id);
      const budgetsData = budgets.data;
      setData((prevData) => ({
        ...prevData,
        budget: budgetsData,
      }));
    } catch (error) {
      console.log(error);
    }
    try {
      const goals = await fetchUserGoals(id);
      const goalsData = goals.data;
      setData((prevData) => ({
        ...prevData,
        goals: goalsData,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (user) => {
    await createUser(user);
  };

  const addTransaction = async (transaction) => {
    const currentDate = new Date();
    const user_id = data.user._id;
    const transactionWithUserId = { ...transaction, user_id };
    const newTransaction = await createTransaction(transactionWithUserId);
    const transactionDate = new Date(newTransaction.data.date);

    if (transactionDate > currentDate) {
      // Add to upcomingTransactions if the transaction date is in the future
      setData((prevData) => ({
        ...prevData,
        upcomingTransactions: [
          ...prevData.upcomingTransactions,
          newTransaction.data,
        ],
      }));
    } else {
      // Add to recentTransactions if the transaction date is in the past or today
      setData((prevData) => ({
        ...prevData,
        recentTransactions: [
          ...prevData.recentTransactions,
          newTransaction.data,
        ],
      }));
    }

    console.log("Transaction Category: ", newTransaction.data.name);

    // Update the relevant budget
    if (newTransaction.data.type === "deducted") {
      await fetchBudgetsGoalsData(user_id);
      console.log("Budgets: ", data.budget);
      const budget = data.budget.find((budget) =>
        budget.categories.includes(newTransaction.data.name)
      );
      if (budget) {
        console.log("Budget found: ", budget);
        updateBudget(budget._id, newTransaction.data.amount);
      }
    }

    // Update the user's balance
    fetchHomePageData(data.user._id);
  };

  const addBudget = async (budget) => {
    const user_id = data.user._id;
    const budgetWithUserId = { ...budget, user_id };
    const newBudget = await createBudget(budgetWithUserId);
    setData((prevData) => ({
      ...prevData,
      budget: [...prevData.budget, newBudget],
    }));
  };

  const addGoal = async (goal) => {
    const user_id = data.user._id;
    const goalWithUserId = { ...goal, user_id };
    // goal.user_id = user_id;
    const newGoal = await createGoal(goalWithUserId);
    setData((prevData) => ({
      ...prevData,
      goals: [...prevData.goals, newGoal],
    }));
  };

  const addNotification = async (notification) => {
    const newNotification = await createNotification(notification);
    setData((prevData) => ({
      ...prevData,
      notifications: [...prevData.notifications, newNotification],
    }));
  };

  const updateBudget = async (budgetId, amountToAdd) => {
    var budgetToBeUpdated = data.budget.find(
      (budget) => budget._id === budgetId
    );
    budgetToBeUpdated = {
      ...budgetToBeUpdated,
      spent: budgetToBeUpdated.spent + amountToAdd,
    };
    await editBudget(budgetId, budgetToBeUpdated);

    setData((prevData) => ({
      ...prevData,
      budget: prevData.budget.map((budget) =>
        budget._id === budgetId
          ? {
              ...budget,
              spent: parseFloat((budget.spent + amountToAdd).toFixed(2)),
            }
          : budget
      ),
    }));

    // Generating a notification if the budget limit is reached or exceeded
    if (
      budgetToBeUpdated.amount == budgetToBeUpdated.spent ||
      budgetToBeUpdated.amount < budgetToBeUpdated.spent
    ) {
      const notification = {
        user_id: data.user._id,
        title: `${budgetToBeUpdated.name} Budget Alert`,
        details:
          budgetToBeUpdated.amount == budgetToBeUpdated.spent
            ? `You have spent all of your budget for ${budgetToBeUpdated.name}.`
            : `You have exceeded your budget for ${budgetToBeUpdated.name}.`,
        destinationUrl: `/budgets/${budgetToBeUpdated._id}`,
      };
      addNotification(notification);
    }
  };

  const updateGoal = async (goalId, amountToAdd) => {
    var goalToBeUpdated = data.goals.find((goal) => goal._id === goalId);
    goalToBeUpdated = {
      ...goalToBeUpdated,
      saved: goalToBeUpdated.saved + amountToAdd,
    };
    await editGoal(goalId, goalToBeUpdated);

    setData((prevData) => ({
      ...prevData,
      goals: prevData.goals.map((goal) =>
        goal._id === goalId
          ? {
              ...goal,
              saved: parseFloat((goal.saved + amountToAdd).toFixed(2)),
            }
          : goal
      ),
    }));
  };

  const updateUserImage = (imageUri) => {
    setData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        imageUri,
      },
    }));
  };

  const updateUserField = async (field, value) => {
    const updatedUser = { ...data.user, [field]: value };
    setData((prevData) => ({
      ...prevData,
      user: updatedUser,
    }));
    await editUser(data.user._id, updatedUser);
  };

  const deleteGoal = async (goalId) => {
    await removeGoal(goalId);
    setData((prevData) => ({
      ...prevData,
      goals: prevData.goals.filter((goal) => goal._id !== goalId),
    }));
  };

  const deleteBudget = async (budgetId) => {
    await removeBudget(budgetId);
    setData((prevData) => ({
      ...prevData,
      budget: prevData.budget.filter((budget) => budget._id !== budgetId),
    }));
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchInitialData,
        fetchHomePageData,
        fetchUserData,
        fetchNotificationsData,
        fetchBudgetsGoalsData,
        getDataAfterAuth,
        addUser,
        addTransaction,
        addBudget,
        addGoal,
        updateGoal,
        updateUserImage,
        updateUserField,
        deleteGoal,
        deleteBudget,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
