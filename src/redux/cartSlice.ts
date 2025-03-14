import { createSlice, PayloadAction } from "@reduxjs/toolkit";  

// Define the structure of a cart item  
interface CartItem {  
    id: number;  
    name: string;  
    price: number;  
    quantity: number;  
}  

// Define the structure of the cart state  
interface CartState {  
    items: CartItem[];  
}  

// Initial state with an empty cart  
const initialState: CartState = {  
    items: [],  
};  

// Create a Redux slice for managing the cart  
const cartSlice = createSlice({  
    name: "cart",  
    initialState,  
    reducers: {  
        // Add an item to the cart (or increase quantity if it already exists)  
        addToCart: (state, action: PayloadAction<CartItem>) => {  
            const existingItem = state.items.find(item => item.id === action.payload.id);  
            if (existingItem) {  
                existingItem.quantity += 1;  
            } else {  
                state.items.push({ ...action.payload, quantity: 1 });  
            }  
        },  
        
        // Decrease the quantity of an item (or remove it if quantity reaches 0)  
        decreaseFromCart: (state, action: PayloadAction<number>) => {  
            const existingItem = state.items.find(item => item.id === action.payload);  
            if (existingItem) {  
                if (existingItem.quantity > 1) {  
                    existingItem.quantity -= 1;  
                } else {  
                    // Remove item if quantity reaches 0  
                    state.items = state.items.filter(item => item.id !== action.payload);  
                }  
            }  
        },  
        
        // Remove an item completely from the cart  
        removeFromCart: (state, action: PayloadAction<number>) => {  
            state.items = state.items.filter((item) => item.id !== action.payload);  
        },  
        
        // Clear all items from the cart  
        clearCart: (state) => {  
            state.items = [];  
        },  
    },  
});  

// Export actions and reducer  
export const { addToCart, decreaseFromCart, removeFromCart, clearCart } = cartSlice.actions;  
export default cartSlice.reducer;  
