import React from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookModal = ({ book, modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          
          {/* Modal Header with Close Button */}
          <View style={styles.header}>
            <View style={styles.bookInfo}>
              <Image source={book.image} style={styles.image} />
              <View >
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>by {book.author}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>

          {/* Book Description */}
          <Text style={styles.description}>{book.description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default BookModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    height:'60%',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { height: 80, width: 60, marginRight: 15 },

  title: { fontSize: 16, fontWeight: 'bold' },
  author: { fontSize: 14, color: 'grey' },
  description: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
  },
});
