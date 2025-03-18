import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../Component/Header';
import Cards from '../Component/Cards';




const LandingPage = () => {
  return (
    
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <Header />
      <Text style={styles.textinput}>Books</Text>
      <Cards />
      
    </View>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
  },
  textinput: {
    fontSize: 26,
    textAlign: 'left',
    justifyContent: 'flex-start',
    marginLeft: 10,
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});
