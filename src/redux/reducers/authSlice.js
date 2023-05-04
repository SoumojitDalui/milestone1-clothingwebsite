import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        AddUser: (state, action) => {
            state.users.push(action.payload);
        }
    }
})

export const { AddUser } = authSlice.actions;

export default authSlice.reducer;