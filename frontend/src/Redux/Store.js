import { configureStore } from '@reduxjs/toolkit';
import userReducer from './loginReducer';

const store = configureStore({
  reducer: {
    auth: userReducer
  }
});

export default store;
