import { View, Text } from 'react-native'
import React from 'react'
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import BookData from './BookData';

BookData();

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(DATA);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const newData = DATA.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(DATA);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
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
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Search;