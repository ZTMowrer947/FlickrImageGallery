// Imports
import { createReducer } from '@reduxjs/toolkit';

import Photo from '../../models/Photo';
import { photoFetchSuccess } from '../actions';

// Initial State
const initialState = {
    allIds: [] as string[],
    byId: {} as Record<string, Photo>,
};

// Reducer
const photo = createReducer(initialState, {
    // Photo fetch successful
    [photoFetchSuccess.type]: (
        state,
        action: ReturnType<typeof photoFetchSuccess>
    ) => {
        // Get photos from payload
        const { photos } = action.payload;

        // For each photo,
        photos.forEach(photo => {
            // Insert photo id into id array
            state.allIds.push(photo.id);

            // Insert photo into by-id record
            state.byId[photo.id] = photo;
        });
    },
});

// State type
export type PhotoState = Readonly<ReturnType<typeof photo>>;

// Export
export default photo;
