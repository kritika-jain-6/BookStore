import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerDetailsModal = ({ isVisible, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    landmark: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      await AsyncStorage.setItem("customerDetails", JSON.stringify(formData));
      onSave(formData); // Send data to Cart screen
      onClose(); // Close modal
    } catch (error) {
      console.error("Error saving customer details:", error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>Customer Details</Text>

          <TextInput style={styles.input} placeholder="Name" value={formData.name} onChangeText={(text) => handleInputChange("name", text)} />
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={formData.phone} onChangeText={(text) => handleInputChange("phone", text)} />
          <TextInput style={styles.input} placeholder="Pincode" keyboardType="numeric" value={formData.pincode} onChangeText={(text) => handleInputChange("pincode", text)} />
          <TextInput style={styles.input} placeholder="Locality" value={formData.locality} onChangeText={(text) => handleInputChange("locality", text)} />
          <TextInput style={styles.input} placeholder="Address" multiline value={formData.address} onChangeText={(text) => handleInputChange("address", text)} />
          <TextInput style={styles.input} placeholder="City/Town" value={formData.city} onChangeText={(text) => handleInputChange("city", text)} />
          <TextInput style={styles.input} placeholder="Landmark" value={formData.landmark} onChangeText={(text) => handleInputChange("landmark", text)} />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Details</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContainer: { width: "90%", backgroundColor: "#fff", padding: 20, borderRadius: 10 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: "#D32F2F", padding: 12, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default CustomerDetailsModal;
