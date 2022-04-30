import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import commentReducer from '../reducers/commentReducer';
import favoriteReducer from '../reducers/favoriteReducer';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteReducer,
    comment: commentReducer
  },
});
