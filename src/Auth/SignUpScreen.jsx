import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      {/* Left Section (Illustration) */}
      <View style={styles.leftContainer}>
        <Image source={{ uri: "https://example.com/illustration.png" }} style={styles.image} />
        <Text style={styles.title}>ONLINE BOOK SHOPPING</Text>
      </View>
      
      {/* Right Section (Signup Form) */}
      <View style={styles.rightContainer}>
        <Text style={styles.heading}>SIGNUP</Text>
        <TextInput style={styles.input} placeholder="Full Name" />
        <TextInput style={styles.input} placeholder="Email ID" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
        <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" },
  leftContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 150, height: 150, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "bold", color: "#333" },
  rightContainer: { flex: 1, justifyContent: "center", padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "#fff", padding: 10, marginBottom: 10, borderRadius: 5, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#a00", padding: 10, alignItems: "center", borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default SignupScreen;
