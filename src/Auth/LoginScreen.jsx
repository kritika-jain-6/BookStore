import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Login successful!');
    console.log('Logging in with:', email, password);
    navigation.navigate('LandingPage'); 
  };

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const user = await GoogleSignin.signIn();
      console.log(user);
      if(!user){
        Alert.alert('Error', 'Google Sign-In failed');
        return;
      }
     
      navigation.navigate('LandingPage');
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      Alert.alert('Error', error.message || 'Google Sign-In failed');
    }
  };

//   const handleGoogleSignin = async () => {
//     try {
//         GoogleSignin.configure({
//             offlineAccess: false,
//             webClientId:
//                 '678953667370-7n1hdbind9u7gf1mp4221vrhtu7u56ib.apps.googleusercontent.com',
//             scopes: ['profile', 'email'],
//         });
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();
//         const {idToken} = await GoogleSignin.signIn();
//         const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
//         await auth().signInWithCredential(googleCredentials);
//         navigation.navigate('LandingPage');
//         return userInfo;
//     } catch (error) {
//         console.log('=> Google Sign In', error);
//         return null;
//     }
// };

  return (
    <View style={styles.container}>
      <Image source={require('../Assets/auth.png')} style={styles.image} />
      <Text style={styles.title}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Email id"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, styles.google]} onPress={handleGoogleSignin}>
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.toggleText}>Don't have an account? Sign Up</Text>
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
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  google: {
    backgroundColor: '#db4a39',
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

export default LoginScreen;
