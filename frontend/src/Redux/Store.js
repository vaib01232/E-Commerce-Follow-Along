import { combineReducer,configureStore, } from '@reduxjs/toolkit';
import userReducer from './loginReducer';

export const store = combineReducer({
  auth:userReducer
});