import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookData from './BookData'; // Import book data
import Header from './Header';
import { useNavigation } from '@react-navigation/native'; // Import for navigation
import CustomerDetailsModal from "../Component/CustomerDetailsScreen"
const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const book = BookData[0];

  const navigation = useNavigation(); // Use the hook for navigation

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };


  const [isModalVisible, setModalVisible] = useState(false);
  
    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  

  // Navigate to OrderConfirmationScreen
  const navigateToOrderConfirmation = () => {
    navigation.navigate('OrderConfirmation');
  };

  // Go back to the previous screen
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header />
      <View style={styles.viewHeader}>
        {/* Back Button */}
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-back" size={30} color={'black'} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.textStyle}>My Bag</Text>
      </View>

      {/* Book Details Section */}
      <View style={styles.bookContainer}>
        {book.image ? (
          <Image source={book.image} style={styles.bookImage} />
        ) : (
          <Text style={styles.errorText}>Image not found</Text>
        )}
        <View style={styles.bookDetails}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.price}>
            Rs. {book.price}{' '}
            <Text style={styles.oldPrice}>Rs. {book.olderPrice}</Text>
          </Text>

          {/* Quantity Control */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Icon name="remove" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Icon name="add" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Customer Details Section */}
      <View style={styles.customerDetails}>
        <Text style={styles.customerTitle}>Customer Details</Text>
        <TouchableOpacity onPress={openModal}>
          <Icon name="add" size={24} color={'black'} />
        </TouchableOpacity>
      </View>

      {/* Footer: Total & Place Order Button */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rs. {book.price * quantity}</Text>
        <TouchableOpacity style={styles.orderButton} onPress={navigateToOrderConfirmation}>
          <Text style={styles.orderButtonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>

      {/* Customer Details Modal */}
      <CustomerDetailsModal isVisible={isModalVisible} onClose={closeModal} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  viewHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 16 },
  arrowIcon: { marginRight: 10 },
  textStyle: { fontSize: 22, fontWeight: 'bold', color: 'black' },

  bookContainer: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  bookImage: { width: 80, height: 100, resizeMode: 'cover', marginRight: 15 },
  bookDetails: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  author: { fontSize: 14, color: 'grey' },
  price: { fontSize: 16, fontWeight: 'bold', marginVertical: 5, color: 'black' },
  oldPrice: { textDecorationLine: 'line-through', color: 'grey' },

  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  quantityButton: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  quantityText: { marginHorizontal: 10, fontSize: 16, color: 'black' },

  customerDetails: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 150, padding: 16 },
  customerTitle: { fontSize: 16, fontWeight: 'bold', color: 'black' },

  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 150, padding: 16 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: 'black' },
  orderButton: { backgroundColor: '#D32F2F', padding: 12, borderRadius: 5 },
  orderButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 14 },

  // Modal Styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '95%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: { marginTop: 20, padding: 10, backgroundColor: '#D32F2F', borderRadius: 5 },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
});
