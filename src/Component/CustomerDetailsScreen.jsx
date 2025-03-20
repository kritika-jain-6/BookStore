import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from "react-native";

const CustomerDetailsModal = ({ isVisible, onClose }) => {
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

  const handleSave = () => {
    alert("Details saved successfully!");
    onClose();  // Close the modal after saving
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>Customer Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            keyboardType="numeric"
            value={formData.pincode}
            onChangeText={(text) => handleInputChange("pincode", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Locality"
            value={formData.locality}
            onChangeText={(text) => handleInputChange("locality", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            multiline
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City/Town"
            value={formData.city}
            onChangeText={(text) => handleInputChange("city", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Landmark"
            value={formData.landmark}
            onChangeText={(text) => handleInputChange("landmark", text)}
          />
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
  container: { flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: "#fff" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { backgroundColor: "#f9f9f9", padding: 10, marginBottom: 10, borderRadius: 5, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#a00", padding: 12, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for the modal
  },
  modalContainer: {
    width: "95%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    justifyContent:'flex-end'
  
  },
});

export default CustomerDetailsModal;
