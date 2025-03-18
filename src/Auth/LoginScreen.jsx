import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Left Section (Illustration & Login Form) */}
      <View style={styles.leftContainer}>
        <Image source={{ uri: "https://example.com/illustration.png" }} style={styles.image} />
        <Text style={styles.title}>ONLINE BOOK SHOPPING</Text>
        
        {/* Login Form */}
        <Text style={styles.heading}>LOGIN</Text>
        <TextInput style={styles.input} placeholder="Email ID" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>OR</Text>
        
        <View style={styles.socialButtons}>
          <TouchableOpacity style={[styles.socialButton, styles.facebook]}>
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.google]}>
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Section (Signup) */}
      <View style={styles.rightContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5" },
  leftContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  image: { width: 150, height: 150, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "#fff", padding: 10, marginBottom: 10, borderRadius: 5, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#a00", padding: 10, alignItems: "center", borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  orText: { textAlign: "center", marginVertical: 10, color: "#666" },
  socialButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  socialButton: { flex: 1, padding: 10, alignItems: "center", borderRadius: 5, marginHorizontal: 5 },
  facebook: { backgroundColor: "#3b5998" },
  google: { backgroundColor: "#db4a39" },

  // Right Section (Signup)
  rightContainer: { 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f5f5f5", 
    width: 150, 
    padding: 20,
  },
  signupText: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#333" },
  signupButton: { backgroundColor: "#28a745", padding: 10, alignItems: "center", borderRadius: 5 },
});

export default LoginScreen;
