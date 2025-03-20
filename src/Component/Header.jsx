import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); 
  const goBack = () => {
    navigation.goBack();
  }; // Access navigation object

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={goBack}>
        <Image source={require('../Assets/logo.jpg')} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.textLogo}>BookStore</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}> 
          <Icon name="search" size={30} color={'#c52026'} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WishList')}> 
          <Icon name="favorite-outline" size={30} color={'#c52026'} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}> 
          <Icon name="shopping-cart" size={30} color={'#c52026'} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  viewContainer: { 
    flexDirection: 'row', 
    marginTop: 5, 
    alignItems: 'center', 
  },
  image: { 
    height: 50, 
    width: 50, 
    marginHorizontal: 10, 
  },
  textLogo: { 
    fontSize: 20, 
    color: '#c52026', 
    textAlign: 'left', 
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    marginLeft: 30, 
  },
  icon: {
    marginHorizontal: 10, 
    shadowColor: "black", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 10, 
  },
});
