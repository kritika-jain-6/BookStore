import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookModal from './BookModal';
import BookData from './BookData'; // Ensure this contains the books array with all the properties
import {addToCart} from '../Redux/Slice/CartReducer';
import {
  addToWishList,
  removeFromWishList,
} from '../Redux/Slice/WishListReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const BookItem = ({book, setSelectedBook, setModalVisible}) => {
  const navigation = useNavigation();

  const wishlist = useSelector(state => state.WishList?.data) || [];
  const cart = useSelector(state => state.Cart?.data) || [];
  const dispatch = useDispatch();

  // wishlist function
  const wishListBook = wishlist.includes(book);
  const handleFavoritePress = book => {
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
  const handleAddToCart = book => {
    if (book) {
      dispatch(addToCart({book: book, quantity: 1}));
      // navigation.navigate('Cart'); // Navigate to the cart screen after adding
    }
  };

  if (!book) return null; // Safe check if book is undefined
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#f5f5f5', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            setSelectedBook(book);
            setModalVisible(true);
          }}>
          <Image source={book.image} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Text style={styles.title}>
          Rs.{book?.price ?? 'N/A'}
          {'   '}
          <Text style={styles.oldPrice}>Rs.{book?.olderPrice ?? 'N/A'}</Text>
        </Text>
        <View style={styles.buttonRow}>
          {/* Heart Icon Button */}
          {!(cart.findIndex(item => item.id === book.id) > -1) && (
            <TouchableOpacity
              onPress={() => handleFavoritePress(book)}
              style={styles.heartButton}>
              <Icon
                name={wishListBook ? 'favorite' : 'favorite-outline'}
                size={20}
                color={'#c52026'}
              />
            </TouchableOpacity>
          )}

          {/* Add / Added Button */}
          <TouchableOpacity
            style={[
              styles.button,
              cart.findIndex(item => item.id === book.id) > -1
                ? styles.addedButton
                : styles.addToBagButton,
            ]}
            onPress={() => handleAddToCart(book)}>
            <Text
              style={[
                styles.buttonText,
                cart.findIndex(item => item.id === book.id) > -1
                  ? styles.addedButtonText
                  : styles.addToBagText,
              ]}>
              {cart.findIndex(item => item.id === book.id) > -1
                ? 'ADDED TO BAG'
                : 'ADD TO BAG'}
            </Text>
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
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <BookItem
            book={item}
            setSelectedBook={setSelectedBook}
            setModalVisible={setModalVisible}
          />
        )}
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
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  image: {height: 130, width: 100, margin: 10},
  title: {fontSize: 14, textAlign: 'center'},
  author: {fontSize: 12, color: 'grey', textAlign: 'center', padding: 2},
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
    padding: 2,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: 'black',
    textAlign: 'center',
    padding: 2,
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 5, // ← adds space on left/right edges
  },
  
  heartButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    marginRight: 5, // ← slightly more space
    marginLeft: 5,
    backgroundColor: '#fff',
  },
  
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',

  },
  
  addToBagButton: {
    backgroundColor: '#c52026',
    paddingHorizontal:2,
  },
  addToBagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:12,
  },
  addedButton: {
    backgroundColor: '#fff0f0',
    borderWidth: 1,
    borderColor: '#c52026',
    paddingHorizontal: 3,
  },
  addedButtonText: {
    color: '#c52026',
    fontWeight: 'bold',
    paddingHorizontal: 2,
  },
});
