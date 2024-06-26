import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import cardsReducer from "./Cards/cardsSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cards: cardsReducer, // Adjust to match your slice name and reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
