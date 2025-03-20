// WishListReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

const WishListReducer = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const book = action.payload;
      // Check if the book is already in the wishlist to prevent duplicates
      const existingBook = state.wishlist.find(item => item.id === book.id);
      if (!existingBook) {
        state.wishlist.push(book);
      }
    },
    removeFromWishList: (state, action) => {
      const bookId = action.payload;
      state.wishlist = state.wishlist.filter(book => book.id !== bookId);
    },
  },
});

export const { addToWishList, removeFromWishList } = WishListReducer.actions;

export default WishListReducer.reducer;
