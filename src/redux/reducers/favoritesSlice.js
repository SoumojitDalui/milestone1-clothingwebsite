import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const favoritesSlice = createSlice({
    name:'favorite',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            if(state.items.length === 0) return;
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;