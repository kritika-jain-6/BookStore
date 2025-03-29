// Navigation.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../Auth/LoginScreen';
import SignUpScreen from '../Auth/SignUpScreen'; // Your signup screen
import Cart from '../Screens/Cart'; // Your cart screen
import WishList from '../Screens/WishList'; // Your wishlist screen
import LandingPage from '../Screens/LandingPage';
import OrderConfirmation from '../Screens/OrderConfirmation';
import Search from '../Component/Search';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />

      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
       <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/> 
      <Stack.Screen
        name="WishList"
        component={WishList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
