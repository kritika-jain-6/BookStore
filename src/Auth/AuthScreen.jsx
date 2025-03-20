import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const AuthScreen = ({ navigation }) => {  // Add the navigation prop
  const [isSignUp, setIsSignUp] = useState(false);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAuth = () => {
    if (isSignUp) {
      // Simple Sign Up logic
      if (!name || !email || !phone || !password) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      Alert.alert('Success', 'Sign Up successful!');
      console.log('Signing up with:', name, email, phone, password);
    } else {
      // Simple Login logic
      if (!email || !password) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      Alert.alert('Success', 'Login successful!');
      console.log('Logging in with:', email, password);
      // Navigate to the Landing page after successful login
      navigation.navigate('LandingPage');  // Navigate to the 'Landing' screen
    }
  };

  return (
    <View style={styles.container}>
      {/* Image at the top */}
      <Image
        source={require('../Assets/auth.png')} // Change to your image path
        style={styles.image}
      />

      <Text style={styles.title}>{isSignUp ? 'SIGN UP' : 'LOGIN'}</Text>

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email id"
        value={email}
        onChangeText={setEmail}
      />

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Phone No"
          value={phone}
          onChangeText={setPhone}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      {/* Social Buttons container */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, styles.facebook]}>
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.google]}>
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.toggleText}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
    color: '#666',
  },
  // New style for social buttons container
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',  // Takes full width
    marginBottom: 20, // Add space below
  },
  socialButton: {
    flex: 1,  // Allows both buttons to take equal space
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5, // Space between buttons
  },
  facebook: {
    backgroundColor: '#4267B2', // Facebook blue
  },
  google: {
    backgroundColor: '#db4a39', // Google red
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 20,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;
