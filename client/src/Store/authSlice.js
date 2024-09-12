import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user authorization state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user_id: null,
        name: null,
        rolename: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user_id = action.payload.user_id;
            state.name=action.payload.name;
            state.rolename = action.payload.rolename;
        },
        clearUser: (state) => {
            state.user_id = null;
            state.name=null;
            state.rolename = null;
        },
    },
});

// Export the slice itself (named export)
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer; // Use default export for the reducer
