import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { submitOrder } from "../services/api";

// Typ för Redux state
interface OrderState {
    currentOrder: {
        orderId: string | null;
        eta: string | null;
        status: "idle" | "loading" | "success" | "failed";
    };
    error: string | null;
}

// Initialt state
const initialState: OrderState = {
    currentOrder: {
        orderId: null,
        eta: null,
        status: "idle",
    },
    error: null,
};

// Async thunk för att skicka en order
export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async ({ tenantName, items }: { tenantName: string; items: string[] }, thunkAPI) => {
        try {
            const response = await submitOrder(tenantName, { items });
            return response;
        } catch (error) {
            console.error("Orderfel:", error);
            return thunkAPI.rejectWithValue("Misslyckades att skicka ordern.");
        }
    }
);

// Order slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
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
                console.log("✅ Order sparad i Redux:", action.payload); // 👈 Logga vad Redux får
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
