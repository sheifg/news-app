import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { newsReducer } from "./newsSlice";

const store = configureStore({
  // The reducer option in configureStore is an object that combines all the slice reducers for your application
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
});
// configureStore: This function is a convenient way to create a Redux store

export default store;
// store: This is the Redux store that holds the state of your application
// It allows you to dispatch actions and subscribe to changes in the state
