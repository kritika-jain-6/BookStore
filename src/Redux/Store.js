import { configureStore } from "@reduxjs/toolkit";
import WishListReducer from "./Slice/WishListReducer";
import CartReducer from "./Slice/CartReducer";

const Store=configureStore({
    reducer:{
        WishList:WishListReducer,
        Cart:CartReducer,
    }
});

export default Store;