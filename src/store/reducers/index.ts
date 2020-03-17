// Imports
import { Action, Reducer } from '@reduxjs/toolkit';

import base, { BaseState } from './base';
import photo, { PhotoState } from './photo';
import tag, { TagState } from './tag';

// State type
export type RootState = BaseState & {
    readonly photo: PhotoState;
    readonly tag: TagState;
};

// Root reducer
const rootReducer: Reducer<RootState, Action<string>> = (state, action) => {
    // Calculate base state
    const baseState = base(state, action);

    // Merge base state with slice states
    return {
        ...baseState,
        photo: photo(state?.photo, action),
        tag: tag(state?.tag, action),
    };
};

// Export
export default rootReducer;
