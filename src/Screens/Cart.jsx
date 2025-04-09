import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Redux/Slice/CartReducer'; // Import Redux actions
import Header from '../Component/Header';
import { useNavigation } from '@react-navigation/native';
import CustomerDetailsModal from '../Component/CustomerDetailsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const dispatch = useDispatch();
  const { data, totalAmount } = useSelector(state => state.Cart) || { data: [], totalAmount: 0 };
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    loadCustomerDetails();
  }, []);

  const loadCustomerDetails = async () => {
    try {
      const storedData = await AsyncStorage.getItem('customerDetails');
      if (storedData) {
        setCustomerDetails(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading customer details:', error);
    }
  };

  const handleSaveCustomerDetails = async storedData => {
      try {
      await AsyncStorage.setItem('customerDetails', JSON.stringify(storedData));
      setCustomerDetails(storedData);
    } catch (error) {
      console.error('Error saving customer details:', error);
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleIncreaseQuantity = book => {
    dispatch(addToCart({ book, quantity: 1 }));
  };

  const handleDecreaseQuantity = book => {
    if (book.quantity > 1) {
      dispatch(addToCart({ book, quantity: -1 }));
    } else {
      handleRemoveBook(book.id);
    }
  };

  const handleRemoveBook = bookId => {
    dispatch(removeFromCart(bookId));
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color={'black'} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.textStyle}>My Bag</Text>
      </View>

      {/* Book Details Section */}
      <ScrollView>
      {data.length > 0 ? (
        data.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
            {book.image ? (
              <Image source={book.image} style={styles.bookImage} />
            ) : (
              <Text style={styles.errorText}>Image not found</Text>
            )}
              <View style={styles.bookDetails}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.price}>Rs. {book.price}</Text>

                {/* Quantity Control */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => handleDecreaseQuantity(book)}
                    style={styles.quantityButton}>
                    <Icon name="remove" size={20} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{book.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => handleIncreaseQuantity(book)}
                    style={styles.quantityButton}>
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
      </ScrollView>

      {/* Customer Details Section */}
      <View style={styles.customerDetails}>
        <Text style={styles.customerTitle}>Customer Details</Text>
        <TouchableOpacity onPress={openModal}>
          <Icon name="add" size={24} color={'black'} />
        </TouchableOpacity>
      </View>

      {customerDetails && (
        <View style={styles.customerInfo}>
          <Text>Name: {customerDetails.name}</Text>
          <Text>Phone: {customerDetails.phone}</Text>
          <Text>Address: {customerDetails.address}, {customerDetails.city}</Text>
        </View>
      )}

      {/* Footer: Total & Place Order Button */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rs. {totalAmount}</Text>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => navigation.navigate('OrderConfirmation')}>
          <Text style={styles.orderButtonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSave={handleSaveCustomerDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  viewHeader: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  arrowIcon: { marginRight: 10 },
  textStyle: { fontSize: 22, fontWeight: 'bold', color: 'black' },
  bookContainer: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  bookImage: { width: 80, height: 100, resizeMode: 'cover', marginRight: 15 },
  bookDetails: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  price: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  quantityButton: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  quantityText: { marginHorizontal: 10, fontSize: 16, color: 'black' },
  customerDetails: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginBottom: 70 },
  customerTitle: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  footer: { position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: 'black' },
  orderButton: { backgroundColor: '#D32F2F', padding: 12, borderRadius: 5 },
  orderButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 16, padding: 15 },
  removeText: { color: 'red', fontSize: 14, marginTop: 5 },
  customerInfo: { padding: 16, backgroundColor: '#f9f9f9', borderRadius: 10, marginHorizontal: 16 , borderWidth: 1, borderColor: '#ccc', marginBottom: 80},
});

export default Cart;
