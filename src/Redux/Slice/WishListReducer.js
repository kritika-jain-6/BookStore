// WishListReducer.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const WishListReducer = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const book = action.payload;
      // Check if the book is already in the wishlist to prevent duplicates
      const existingBook = state.data.includes(item => item.id === book.id);
      if (!existingBook) {
        state.data.push(book);
      }
    },
    removeFromWishList: (state, action) => {
      const bookId = action.payload;
      state.data = state.data.filter(book => book.id !== bookId);
    },
  },
});

export const {addToWishList, removeFromWishList} = WishListReducer.actions;

export default WishListReducer.reducer;
