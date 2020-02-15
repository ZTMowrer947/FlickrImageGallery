// Imports
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Store setup
const store = configureStore({
    reducer: rootReducer,
});

// Exports
export type AppDispatch = typeof store.dispatch;
export default store;
