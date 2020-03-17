// Imports
import { createReducer } from '@reduxjs/toolkit';

import Tag from '../../models/Tag';
import { photoFetchSuccess } from '../actions';

// Initial state
const initialState = {
    allIds: [] as string[],
    byId: {} as Record<string, Tag>,
};

// Reducer
const tag = createReducer(initialState, {
    // Photo fetch completed successfully
    [photoFetchSuccess.type]: (
        state,
        action: ReturnType<typeof photoFetchSuccess>
    ) => {
        // Get tag from payload
        const { tag } = action.payload;

        // Insert tag id into id array
        state.allIds.push(tag.id);

        // Insert tag into by-id record
        state.byId[tag.id] = tag;
    },
});

// State type
export type TagState = Readonly<ReturnType<typeof tag>>;

// Export
export default tag;
