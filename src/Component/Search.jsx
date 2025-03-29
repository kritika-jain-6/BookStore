import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import BookData from './BookData'; // Import the BookData array

const Search = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Handle search text change
  const handleSearch = text => {
    setSearchText(text.trim());

    if (text.trim().length > 0) {
      const newData = BookData.filter(item => item.title.includes(text));

      console.log('Filtered Data:', newData);
      setFilteredData(newData);
    } else {
      setFilteredData(BookData); // If search text is empty, show all data
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back" size={30} color="#c52026" />
      </TouchableOpacity>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for books..."
        value={searchText}
        onChangeText={handleSearch} // Trigger search when text changes
      />

      {/* Display "Book Not Found" if no results */}
      {filteredData.length == 0 ? (
        <Text style={styles.notFoundText}>Book not found</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()} // Ensure the key is a string
          renderItem={({item}) => {
            return (
            <Text style={styles.item}>{item.title}</Text>        
            ) // Display book name
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:10,
    marginTop: 50,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  notFoundText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#c52026',
    marginTop: 20,
  },
});

export default Search;
