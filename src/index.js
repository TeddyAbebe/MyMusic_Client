import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
import songsReducre from "./features/songsSlice";

// const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    songs: songsReducre,
  },
  // middleware: [saga],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
