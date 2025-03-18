import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LandingPage from './src/Screens/LandingPage';
import Navigation from './src/Navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import WishList from './src/Component/WishList';
import Cart from './src/Component/Cart';





const App = () => {
  return (
  
     <NavigationContainer>
       <Navigation/>
     </NavigationContainer>
 
  )
}

export default App