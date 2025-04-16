import { configureStore } from '@reduxjs/toolkit';
import userReducer from './LoginReducer';

const store = configureStore({
  reducer: {
    auth: userReducer
  }
});

export default store;
