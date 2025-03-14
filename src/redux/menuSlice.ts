import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getMenu, MenuItem } from "../services/api";

// Define the state structure for the menu
interface MenuState {
    items: MenuItem[];
    status: "idle" | "loading" | "succeeded" | "failed";
}

// Async action to fetch the menu from the API
export const fetchMenu = createAsyncThunk<MenuItem[]>(
    "menu/fetchMenu", 
    async () => {
        return await getMenu();
    }
);

// Initial state
const initialState: MenuState = {
    items: [],
    status: "idle",
};

// Create the menu slice
const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchMenu.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default menuSlice.reducer;
