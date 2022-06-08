import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../storeSlice/counter/counterSlice';
import todoReducer from '../storeSlice/todo/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer
  },
});
