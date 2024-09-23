import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user authorization state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user_id: null,
        username: null,
        firstname: null,
        icon: null,
        rolename: null,
    },
    
    reducers: {
        setUserId: (state, action) => ({...state, user_id: action.payload.user_id}),

        setUserData: (state, action) => ({
            ...state,
            user_id: action.payload.user_id,
            username: action.payload.username,
            firstname: action.payload.firstname,
            icon: action.payload.icon,
            rolename: action.payload.rolename
        }),
        
        clearUser: (state) => {
            state.user_id = null;
            state.name=null;
            state.rolename = null;
            state.icon=null;
        },
    },
});

// Export the slice itself (named export)
export const { setUserId, setUserData, clearUser } = authSlice.actions;
export default authSlice.reducer; // Use default export for the reducer
