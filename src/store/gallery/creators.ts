// Imports
import { ActionCreator } from "redux";
import {
    FetchPhotosStartAction,
    FETCH_PHOTOS_START,
    FetchPhotosSuccessAction,
    FetchPhotosFailedAction,
    Photo,
    FETCH_PHOTOS_DONE,
} from "./types";

// Action creators
export const startPhotoFetch: ActionCreator<FetchPhotosStartAction> = (
    tag: string
) => ({
    type: FETCH_PHOTOS_START,
    meta: { tag },
});

export const finishPhotoFetch: ActionCreator<
    FetchPhotosSuccessAction | FetchPhotosFailedAction
> = (photos: Photo[], error?: Error) => {
    if (error)
        return {
            type: FETCH_PHOTOS_DONE,
            error: true,
            payload: error,
        };

    return {
        type: FETCH_PHOTOS_DONE,
        payload: photos,
    };
};
