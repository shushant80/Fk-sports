import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/cartSlice";
import wishListReducer from "../Features/Wishlist/wishListSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishListReducer,
  },
});

export default store;
