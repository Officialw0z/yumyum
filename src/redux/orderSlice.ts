import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Typ för en order
interface Order {
    id: string;
    items: { id: string; name: string; quantity: number; price: number }[];
    total: number;
}

// Typ för Redux state
interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
    },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
