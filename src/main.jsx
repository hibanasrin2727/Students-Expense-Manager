import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App.jsx";

import store from "./app/store.js";

import "./index.css";


createRoot(document.getElementById("root")).render(

  <StrictMode>

    {/* 
      Provider makes the Redux store available
      to the entire React application.
    */}
    <Provider store={store}>

      <App />

    </Provider>

  </StrictMode>

);