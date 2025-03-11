import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getMenu, MenuItem } from "../services/api";

// Typ för en menyartikel
// Removed duplicate MenuItem interface

// Typ för Redux state
interface MenuState {
    items: MenuItem[];
    status: "idle" | "loading" | "succeeded" | "failed";
}

// Hämta meny från API
export const fetchMenu = createAsyncThunk<MenuItem[]>(
    "menu/fetchMenu", 
    async () => {
        return await getMenu();
    }
);

const initialState: MenuState = {
    items: [],
    status: "idle",
};

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
