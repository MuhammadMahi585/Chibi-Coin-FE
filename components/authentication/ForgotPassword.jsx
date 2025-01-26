import React, { useState } from "react";
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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../utils/firebaseConfig";

const auth = getAuth(app);

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    setLoading(true);

    // Check if email exists in Firebase and send reset link
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        Alert.alert(
          "Success",
          `A password reset email has been sent to ${email}. Please check your inbox and follow the instructions.`,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      })
      .catch((error) => {
        setLoading(false);

        let errorMessage = "Something went wrong. Please try again.";
        if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email address.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "The email address is not valid.";
        }

        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./../../assets/logo.png")}
          style={styles.logoImg}
        />
      </View>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your registered email address, and we will send you a link to reset your password.
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.5 }]}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Text>
        <Icon name="send" size={20} color="white" />
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Remembered your password?{" "}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
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
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
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
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#34c759",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  loginText: {
    color: "#34c759",
    fontWeight: "bold",
  },
});

export default ForgotPassword;
