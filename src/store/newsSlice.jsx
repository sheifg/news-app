import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  news: [],
  error: false,
  loading: false,
};

const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY); // Check if the key is correctly output

// ! createAsyncThunk is a utility provided by Redux Toolkit to handle asynchronous operations in Redux
// createAsyncThunk will take 2 parameters: name of the action and the async function
export const getNews = createAsyncThunk(
  "getNews", //name of the action type
  // https://redux-toolkit.js.org/api/createAsyncThunk
  // It will be just used rejectWithValue to check if there is an error
  // thunkApi is an object
  // https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
  async (thunkApi, { rejectWithValue }) => {
    const url = `
https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
      // Destructure the data
      const { data } = await axios(url);
      console.log(data);
      return data.articles;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// owner is the store
// inside are reducers -> employess
// inside action coffee to the customer
// when an action happens it changes the state
// states chnges according to the actions

const newsSlice = createSlice({
  name: "news",
  initialState,
  //! search for: reducer is a pure function, inside the reducers we cant fetch data, we cant do async functions. We need something to help me to use async functions: createAsyncThunk
  //
  reducers: {
    clearnews(state) {
      state.news = [];
    },
  },
  // extraReducers is responsible for handling the 3 cases of the request it is made(fetching the url): 1- peding 2- fulfilled 3 - rejected
  // to use with reducer the async functions it is necessary to use extraReducers
  // It is needed to fetch the data outside the reducers
  // builder is an object lets u acess addcase. There are 3 addCase: pending, accpeted and rejected
  // there are other ways to do it, using createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        // If the api fetchng is still loading, it is pending, the loading will be true. It is needed to add loading to the initialState as false)
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        // fulfilled means is accepted, if it is fetched the api and it is successful, it is necessary the ation.payload and loading will be again false, because it is not loading anymore. It is also needed to add news to the initialState as []
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(getNews.rejected, (state, action) => {
        // If the api fetching is rejected, it will have an error, the loading will be false because we have an message, so it is needed the action.payload that it will containt the error message. It is also needed to add error to the initialState as false
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export includes everything
export const newsReducer = newsSlice.reducer;
// clearnews is action
export const { clearnews } = newsSlice.actions;
