import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

// Configure the Redux store with the reducers
export const store = configureStore({
    reducer: {
        menu: menuReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});

// Define types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
