import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Typ för ett objekt i varukorgen
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Typ för Redux state
interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        decreaseFromCart: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    // Om det är sista varan, ta bort den från varukorgen
                    state.items = state.items.filter(item => item.id !== action.payload);
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, decreaseFromCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
