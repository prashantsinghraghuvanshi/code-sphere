import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user authorization state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user_id: null,
        name: null,
        icon: null,
        rolename: null,
    },
    reducers: {
        setUserId: (state, action) => ({...state, user_id: action.payload.user_id}),
        setUserName: (state, action)=> ({...state, name: action.payload.username}),
        setUserIcon: (state, action)=> ({...state, icon: action.payload.icon}),
        setRolename: (state, action)=> ({...state, rolename: action.payload.rolename}),
        
        clearUser: (state) => {
            state.user_id = null;
            state.name=null;
            state.rolename = null;
            state.icon=null;
        },
    },
});

// Export the slice itself (named export)
export const { setUserId, setUserName, setUserIcon, setRolename, clearUser } = authSlice.actions;
export default authSlice.reducer; // Use default export for the reducer
