import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [], // Books in the cart (fixed from 'item' to 'items')
  totalAmount: 0, // Total price of the books in the cart
};

const CartReducer = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    // Action to add a book to the cart
    addToCart: (state, action) => {
      const { book, quantity } = action.payload; // Destructure book and quantity from action.payload
      const existingItem = state.items.find(item => item.id === book.id);

      if (existingItem) {
        existingItem.quantity += quantity; // Increase quantity if the book already exists in the cart
      } else {
        state.items.push({ ...book, quantity }); // Add new book to the cart if it's not in the cart
      }

      state.totalAmount += book.price * quantity; // Update total amount based on the book's price and quantity
    },

    // Action to remove a book from the cart
    removeFromCart: (state, action) => {
      const bookId = action.payload; // Get the book ID from the action payload
      const existingItem = state.items.find(item => item.id === bookId);

      if (existingItem) {
        state.items = state.items.filter(item => item.id !== bookId); // Remove the item from the cart
        state.totalAmount -= existingItem.price * existingItem.quantity; // Update total amount
      }
    },

    // Action to clear the cart
    clearCart: (state) => {
      state.items = []; // Clear all items from the cart
      state.totalAmount = 0; // Reset total amount to zero
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = CartReducer.actions; // Export actions

export default CartReducer.reducer; // Export the reducer
