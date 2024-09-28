import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user_id: null,
        username: null,
        firstname: null,
        icon: null,
        rolename: null,
        postContainer: 0, // 0 = questions, 1 = posts, 2 = answers
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
            state.username = null;
            state.firstname = null;
            state.icon = null;
            state.rolename = null;
            state.postContainer = 0; // Reset to default on logout
        },

        setPostContainer: (state, action) => {
            state.postContainer = action.payload; // payload will be 0, 1, or 2
        },
    },
});

// Export the slice actions and reducer
export const { setUserId, setUserData, clearUser, setPostContainer } = authSlice.actions;
export default authSlice.reducer;
