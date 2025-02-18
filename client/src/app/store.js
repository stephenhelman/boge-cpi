import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import clientReducer from "../clientSlice";

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },

  devTools: true,
});

setupListeners(store.dispatch);
