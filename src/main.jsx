import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  // It enables routing in the React application
  <BrowserRouter>
    {/* <Provider>: This component is from the react-redux library. It provides the Redux store to the rest of your application */}
    <Provider store={store}>
      {/* cssbaseline is a component that removes the default padding and the margin in material */}
      <CssBaseline />
      <App />
    </Provider>
  </BrowserRouter>
);
