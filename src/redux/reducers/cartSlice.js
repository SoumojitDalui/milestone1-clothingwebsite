import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            if(state.items.length) {
                const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
                if(itemIndex !== -1) {
                    state.items[itemIndex].quantity += 1;
                } else {
                    state.items.push({...action.payload, quantity: 1});
                }
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
        },
        RemoveFromCart: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload);
            state.items.splice(itemIndex, 1);
        },
        AddQuantity: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload);
            state.items[itemIndex].quantity += 1;
        },
        SubtractQuantity: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload);
            state.items[itemIndex].quantity -= 1;
        }
    }
})

export const { AddToCart, RemoveFromCart, AddQuantity, SubtractQuantity } = cartSlice.actions;

export default cartSlice.reducer;