import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { submitOrder } from "../services/api";

// Define the state structure for an order
interface OrderState {
    currentOrder: {
        orderId: string | null;
        eta: string | null;
        status: "idle" | "loading" | "success" | "failed";
    };
    error: string | null;
}

// Initial state
const initialState: OrderState = {
    currentOrder: {
        orderId: null,
        eta: null,
        status: "idle",
    },
    error: null,
};

// Async action to place an order
export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async ({ tenantName, items }: { tenantName: string; items: number[] }, thunkAPI) => {
        try {
            const response = await submitOrder(tenantName, { items });
            return response;
        } catch (error) {
            console.error("Order error:", error);
            return thunkAPI.rejectWithValue("Failed to place the order.");
        }
    }
);

// Create the order slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        // Reset the order state
        clearOrder: (state) => {
            state.currentOrder.orderId = null;
            state.currentOrder.eta = null;
            state.currentOrder.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.currentOrder.status = "loading";
            })
            .addCase(placeOrder.fulfilled, (state, action: PayloadAction<{ id: string; eta: string }>) => {
                console.log("✅ Order saved in Redux:", action.payload);
                state.currentOrder.orderId = action.payload.id;
                state.currentOrder.eta = action.payload.eta;
                state.currentOrder.status = "success";
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.currentOrder.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
