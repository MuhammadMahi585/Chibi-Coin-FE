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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../utils/firebaseConfig";

const auth = getAuth(app);
const CreateAccountScreen = ({ navigation }) => {
  const { setData, addUser } = useContext(DataContext);

  // Local state for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // Validate inputs
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password,
      currency: "PKR",
    };
    // await createUser(newUser);
    await addUser(newUser);

    // Use Firebase Authentication to create a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully created user
        const user = userCredential.user;
        // fetchInitialData(user.email);

        // Send data to context after user is created
        setData((prevData) => ({
          ...prevData,
          user: {
            ...prevData.user,
            name,
            email,
            password,
          },
        }));

        // Show confirmation message
        Alert.alert(
          "Success",
          "Account created successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        // Handle errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error during sign-up:", errorCode, errorMessage);
        Alert.alert("Error", `Code: ${errorCode}, Message: ${errorMessage}`);
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

      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign up</Text>
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Login")} // Navigate to Login screen
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
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "start",
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
  signupButton: {
    flexDirection: "row",
    backgroundColor: "#34c759",
    opacity: 0.8,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: 20,
    width: "40%",
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  logoImg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
export default CreateAccountScreen;
