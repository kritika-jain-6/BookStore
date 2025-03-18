import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookModal from './BookModal';
import BookData from './BookData';

const Cards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState(""); // State to manage the message

  // Function to handle the long press action
  const handleLongPress = () => {
    setMessage("Added to Bag"); // Set the message when long-pressed
  };

  const BookItem = ({ book }) => {
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
            Rs.{book.price}{'   '}
            <Text style={styles.oldPrice}>Rs.{book.olderPrice}</Text>
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
            <TouchableOpacity>
              <Icon name="favorite-outline" size={30} color={'black'} style={styles.iconbutton} />
            </TouchableOpacity>
            <View style={styles.container}>
              {/* ADD TO BAG Button */}
              <TouchableOpacity
                style={styles.button}
                onLongPress={handleLongPress} // Long press handler
              >
                <Text style={styles.buttonText}>ADD TO BAG</Text>
              </TouchableOpacity>

              {/* Message Display */}
              {message && <Text style={styles.message}>{message}</Text>}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={BookData}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => <BookItem book={item} />}
      />

      {/* Display the BookModal when modalVisible is true */}
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
    padding: 5,
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
    textAlign: 'center',
    fontSize: 14,
  },
});
