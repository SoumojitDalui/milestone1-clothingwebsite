import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import cartSlice from "./reducers/cartSlice";
import authReducer from "./reducers/authSlice";
import favoritesReducer from "./reducers/favoritesSlice";

export const store = configureStore({
    reducer: {cart: cartSlice, auth: authReducer, favorite: favoritesReducer},
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})