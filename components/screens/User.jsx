import React, { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { DataContext } from "../contexts/DataContext";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";
import * as Updates from "expo-updates";

const User = ({ navigation }) => {
  const { data, fetchUserData, updateUserImage, updateUserField } =
    useContext(DataContext);
  const [uploading, setUploading] = useState(false);

  const handleCurrencyChange = (value) => {
    updateUserField("currency", value);
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        await fetchUserData(data.user._id);
      }

      fetchData();
    }, [])
  );

  const pickImageAndUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Please allow access to your media library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        console.log("User canceled image picker.");
        return;
      }

      const imageUri = result.assets[0].uri;
      updateUserImage(imageUri);

      setUploading(false);
      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image:", error);
      Alert.alert("Upload Failed", "Something went wrong during the upload.");
    }
  };

  const handleLogout = async () => {
    await Updates.reloadAsync();
  };

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <Backbar name="Profile" avatar={true} imageUri={data.user.imageUri} />
        <View style={styles.subContainer}>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={pickImageAndUpload}
              style={styles.profileImageContainer}
            >
              {uploading ? (
                <ActivityIndicator size="large" color="#2BCB79" />
              ) : data.user.imageUri ? (
                <Image
                  source={{ uri: data.user.imageUri }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.addPhotoText}>Add a Photo</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.profileDetailsContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.profileDetailsText}
              value={data.user.name}
              onChangeText={(text) => updateUserField("name", text)}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.profileDetailsText}
              value={data.user.email}
              onChangeText={(text) => updateUserField("email", text)}
            />

            <Text style={styles.label}>Currency</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={data.user.currency}
                onValueChange={handleCurrencyChange}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                enabled={false}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="PKR" value="PKR" />
              </Picker>
            </View>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#2BCB79",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: "cover",
  },
  addPhotoText: {
    fontSize: 16,
    color: "#2BCB79",
    fontWeight: "bold",
  },
  profileDetailsContainer: {
    padding: 20,
  },
  label: {
    color: "#000",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  profileDetailsText: {
    fontSize: 16,
    backgroundColor: "#eee",
    color: "#000",
    padding: 18,
    marginBottom: 15,
    borderRadius: 5,
  },
  pickerContainer: {
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 15,
    color: "#000",
  },
  picker: {
    color: "#000",
    padding: 4,
  },
  pickerItem: {
    color: "#000",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#2BCB79",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default User;
