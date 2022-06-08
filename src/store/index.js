import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../storeSlice/todo/todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer
  },
});
