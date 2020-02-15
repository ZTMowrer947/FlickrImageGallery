// Imports
import { Action, ThunkAction } from '@reduxjs/toolkit';

import Photo from '../models/Photo';
import fetchPhotos from '../services/fetchPhotos';
import {
    startPhotoFetch,
    photoFetchFailed,
    photoFetchSuccess,
} from './actions';
import { RootState } from './reducers';

// Thunk types
type FetchPhotoAction = ThunkAction<
    Promise<void>,
    RootState,
    void,
    Action<string>
>;

// Thunks
export function fetchPhotosByTag(tag: string): FetchPhotoAction {
    return async dispatch => {
        // Begin photo fetch
        dispatch(startPhotoFetch(tag));

        // Define variable to hold photo data
        let photos: Photo[] = [];

        try {
            // Attempt to fetch photo data
            photos = await fetchPhotos(tag);
        } catch (error) {
            // If fetch fails, dispatch failure action
            dispatch(photoFetchFailed(error));

            // Stop here
            return;
        }

        // Otherwise, dispatch success action
        dispatch(photoFetchSuccess(tag, photos));
    };
}

export function fetchPhotosIfNeeded(tag: string): FetchPhotoAction {
    return async (dispatch, getState) => {
        // Get tag id listing from state
        const { allIds: tagIds } = getState().tag;

        // If tag ids include tag,
        if (tagIds.includes(tag)) {
            // Photo data is already present, don't do anything else
            return;
        }

        // Otherwise, fetch photo data
        await dispatch(fetchPhotosByTag(tag));
    };
}
