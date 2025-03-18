import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Header from './Header';

const OrderConfirmation = () => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Image
          source={{uri: 'https://example.com/confetti.png'}}
          style={styles.image}
        />
        <Text style={styles.successText}>Order Placed Successfully</Text>
        <Text style={styles.message}>
          Hurray!!! Your order is confirmed. The order ID is #123456. Save the
          order ID for further communication.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CONTINUE SHOPPING</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.contact}>
          📧 admin@bookstore.com | 📞 +91 8163475881
        </Text>
        <Text style={styles.address}>
          📍 42, 14th Main, 15th Cross, Sector 4, Opp to BDA Complex, near
          Kumarakom restaurant, HSR Layout, Bangalore 560034
        </Text>
        <Text style={styles.copyright}>
          © 2020, Bookstore Private Limited. All Rights Reserved
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', alignItems: 'center'},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  image: {width: 100, height: 100, marginBottom: 20},
  successText: {fontSize: 20, fontWeight: 'bold', color: '#333'},
  message: {textAlign: 'center', color: '#666', marginVertical: 10},
  button: {
    backgroundColor: '#a00',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  contact: {color: '#666', marginBottom: 5},
  address: {color: '#666', textAlign: 'center', marginBottom: 5},
  copyright: {color: '#999', fontSize: 12},
});

export default OrderConfirmation;
