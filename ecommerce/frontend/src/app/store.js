// import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../services/auth/authSlice';
// export const store = configureStore({
//   reducer: {
//     auth :authSlice
//   },
// });

import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import categorySlice from '../services/category/categorySlice';
import productsSlice from '../services/product/productsSlice';
import cartSlice from '../services/cart/cartSlice';

const reducers = combineReducers({
  auth :authSlice,
  category:categorySlice,
  product:productsSlice,
  cart:cartSlice
});

const persistConfig = {
    key: 'ecommerce',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

