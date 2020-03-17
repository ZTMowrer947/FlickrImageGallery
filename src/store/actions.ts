// Imports
import { createAction } from '@reduxjs/toolkit';
import { serializeError } from 'serialize-error';

import Photo from '../models/Photo';
import Tag from '../models/Tag';

// Actions
export const startPhotoFetch = createAction<string>('PHOTO_FETCH_STARTED');
export const photoFetchSuccess = createAction(
    'PHOTO_FETCH_SUCCESS',
    (tagId: string, photos: Photo[]) => {
        // Create tag
        const tag: Tag = {
            id: tagId,
            photoIds: photos.map(photo => photo.id),
        };

        // Return payload with tag and photo data
        return {
            payload: {
                tag,
                photos,
            },
        };
    }
);
export const photoFetchFailed = createAction(
    'PHOTO_FETCH_FAILED',
    (error: Error) => ({
        payload: serializeError(error),
        error: true,
    })
);
