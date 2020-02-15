// Imports
import { createReducer } from '@reduxjs/toolkit';
import { ErrorObject } from 'serialize-error';

import {
    startPhotoFetch,
    photoFetchSuccess,
    photoFetchFailed,
} from '../actions';

// Initial state
const initialState = {
    isFetching: false,
    error: null as ErrorObject | null,
};

// Reducer
const base = createReducer(initialState, {
    // Photo fetch has begun
    [startPhotoFetch.type]: state => {
        // Set fetching state
        state.isFetching = true;

        // Clear any previous errors
        state.error = null;
    },

    // Photo fetch completed successfully
    [photoFetchSuccess.type]: state => {
        // Unset fetching state
        state.isFetching = false;
    },

    // Photo fetch has failed
    [photoFetchFailed.type]: (
        state,
        action: ReturnType<typeof photoFetchFailed>
    ) => {
        // Unset fetching state
        state.isFetching = false;

        // Attach error
        state.error = action.payload;
    },
});

// State type
export type BaseState = Readonly<ReturnType<typeof base>>;

// Export
export default base;
