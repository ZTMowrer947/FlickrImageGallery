// Imports
import { configureStore } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch';

import rootReducer from './reducers';

// Store setup
const store = configureStore({
    reducer: rootReducer,
    enhancers: baseEnhancers => [reduxBatch, ...baseEnhancers, reduxBatch],
});

// Exports
export type AppDispatch = typeof store.dispatch;
export default store;
