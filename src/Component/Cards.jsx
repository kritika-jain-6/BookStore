import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookModal from './BookModal';
import BookData from './BookData'; // Ensure this contains the books array with all the properties
import { addToCart } from '../Redux/Slice/CartReducer';
import { addToWishList, removeFromWishList } from '../Redux/Slice/WishListReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const BookItem = ({ book, setSelectedBook, setModalVisible }) => {
  const navigation = useNavigation();

  const wishlist = useSelector((state) => state.WishList?.data) || [];
  const cart = useSelector((state) => state.Cart?.data) || []
  const dispatch = useDispatch();


  // wishlist function 
  const wishListBook = wishlist.includes(book);
  const handleFavoritePress = (book) => {
    const isBookInWishlist = wishListBook;
    if (isBookInWishlist) {
      dispatch(removeFromWishList(book.id));
    } else {           
      dispatch(addToWishList(book));      
    }
    // Navigate to the Wishlist screen after pressing the favorite icon
    // navigation.navigate('WishList'); // Replace 'WishList' with the correct screen name
  };

  // cart function
  const handleAddToCart = (book) => {
    if (book) {
      dispatch(addToCart({book:book,quantity:1}));
      // navigation.navigate('Cart'); // Navigate to the cart screen after adding
    }
  };
  
  if (!book) return null; // Safe check if book is undefined
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#f5f5f5', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedBook(book);
            setModalVisible(true);
          }}
        >
          <Image source={book.image} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Text style={styles.title}>
          Rs.{book?.price ?? 'N/A'}{'   '}
          <Text style={styles.oldPrice}>
            Rs.{book?.olderPrice ?? 'N/A'}
          </Text>
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
          <TouchableOpacity onPress={() => handleFavoritePress(book)}>
            <Icon
              name={wishListBook ? 'favorite' : 'favorite-outline'}
              size={30}
              color={'#c52026'}
              style={styles.iconbutton}
            />
          </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(book)}>
              {cart.findIndex(item => item.id == book.id) > -1 ? (
                <Text style={styles.buttonText}>ADDED TO BAG</Text>
              ) : (
                <Text style={styles.buttonText}>ADD TO BAG</Text>
              )}
              
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Cards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
 
  return (
    <View>
      <FlatList
        data={BookData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <BookItem book={item} setSelectedBook={setSelectedBook} setModalVisible={setModalVisible} />}
      />

      {selectedBook && (
        <BookModal
          book={selectedBook}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  image: { height: 130, width: 100, margin: 10 },
  title: { fontSize: 14, textAlign: 'center' },
  author: { fontSize: 12, color: 'grey', textAlign: 'center', padding: 2 },
  price: { fontSize: 16, fontWeight: 'bold', marginVertical: 5, textAlign: 'center', padding: 2 },
  oldPrice: { textDecorationLine: 'line-through', color: 'black', textAlign: 'center', padding: 2 },
  button: {
    backgroundColor: '#c52026',
    color: '#f5f5f5',
    padding: 8,
    borderRadius: 5,
    marginLeft: 15,
  },
 
  iconbutton: {
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: 5,
    width: 35,
  },
  message: {
    color: '#c52026',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
