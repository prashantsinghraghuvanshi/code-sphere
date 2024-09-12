import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the reducer as default

// Create and export the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer, // Use authReducer here
    },
});

export default store;
