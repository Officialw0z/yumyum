import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        cart: cartReducer,  // Nu finns en reducer här
        order: orderReducer, // Nu finns en reducer här
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
