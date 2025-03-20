import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Redux/Slice/CartReducer'; // Import actions
import Header from '../Component/Header';
import { useNavigation } from '@react-navigation/native';
import CustomerDetailsModal from "../Component/CustomerDetailsScreen";

const Cart = () => {
  const dispatch = useDispatch(); // Use dispatch for actions
  const { items = [], totalAmount = 0 } = useSelector(state => state.cart || {}); // Default fallback to empty array for items and 0 for totalAmount
  
  const navigation = useNavigation(); // Navigation hook

  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const navigateToOrderConfirmation = () => {
    navigation.navigate('OrderConfirmation');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleIncreaseQuantity = (book) => {
    dispatch(addToCart({ book, quantity: 1 })); // Add one more of this book to the cart
  };

  const handleDecreaseQuantity = (book) => {
    dispatch(removeFromCart(book.id)); // Remove one of this book from the cart
  };

  const handleRemoveBook = (bookId) => {
    dispatch(removeFromCart(bookId)); // Remove this book from the cart
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-back" size={30} color={'black'} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.textStyle}>My Bag</Text>
      </View>

      {/* Book Details Section */}
      {items.length > 0 ? (
        items.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
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
                <TouchableOpacity onPress={() => handleDecreaseQuantity(book)} style={styles.quantityButton}>
                  <Icon name="remove" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{book.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncreaseQuantity(book)} style={styles.quantityButton}>
                  <Icon name="add" size={20} color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => handleRemoveBook(book.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.errorText}>No items in the cart</Text>
      )}

      {/* Customer Details Section */}
      <View style={styles.customerDetails}>
        <Text style={styles.customerTitle}>Customer Details</Text>
        <TouchableOpacity onPress={openModal}>
          <Icon name="add" size={24} color={'black'} />
        </TouchableOpacity>
      </View>

      {/* Footer: Total & Place Order Button */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rs. {totalAmount}</Text>
        <TouchableOpacity style={styles.orderButton} onPress={navigateToOrderConfirmation}>
          <Text style={styles.orderButtonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>

      {/* Customer Details Modal */}
      <CustomerDetailsModal isVisible={isModalVisible} onClose={closeModal} />
    </View>
  );
};

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
  errorText: { color: 'red', fontSize: 16, padding: 15 },
  removeText: { color: 'red', fontSize: 14, marginTop: 5 },
});

export default Cart;
