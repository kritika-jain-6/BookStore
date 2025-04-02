import React from 'react';  // Only one import for React is needed
import { Provider } from 'react-redux';  // Import the Provider component
import { NavigationContainer } from '@react-navigation/native';  // Import the NavigationContainer
import Navigation from './src/Navigation/Navigation';  // Import your Navigation component
import Store from './src/Redux/Store';  // Import the store
import "./src/config/GoogleAuth";

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
