import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DataContext } from "../contexts/DataContext";
import app from "../utils/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { loginUser } from "../../api/services/userService";

const auth = getAuth(app);
const LoginScreen = ({ navigation }) => {
  const { data, fetchInitialData } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Validate input
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    // await loginUser({ email, password });

    // Attempt to log in using Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // const email = userCredential.user.email;

        // If successful, show success alert and navigate
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Main", { screen: "Home" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Show error alerts for specific Firebase Authentication errors
        if (errorCode === "auth/user-not-found") {
          Alert.alert("Error", "No user found with this email.");
        } else if (errorCode === "auth/wrong-password") {
          Alert.alert("Error", "Incorrect password.");
        } else {
          Alert.alert("Error", `Login failed: ${errorMessage}`);
        }
      });
    await fetchInitialData(email);
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./../../assets/logo.png")}
          style={styles.logoImg}
        />
      </View>

      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Please sign in to continue.</Text>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        activeOpacity={0.7}
      >
        <Text style={styles.loginButtonText}>Login</Text>
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("SignUp")}
        >
          SignUp
        </Text>
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Forgot")}
        activeOpacity={0.7}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2fff1",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoImg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#34c759",
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "flex-end",
    width: "40%",
    opacity: 0.8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  forgotPasswordText: {
    marginTop: 10,
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  signupText: {
    color: "#34c759",
    fontWeight: "bold",
  },
});

export default LoginScreen;
