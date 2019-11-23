// Imports
import { Action } from "redux";

// Action types
export const FETCH_PHOTOS_START = "FETCH_PHOTOS_START";
export const FETCH_PHOTOS_DONE = "FETCH_PHOTOS_DONE";

export interface FetchPhotosStartAction
    extends Action<typeof FETCH_PHOTOS_START> {
    payload: {
        tag: string;
    };
}

export interface FetchPhotosSuccessAction
    extends Action<typeof FETCH_PHOTOS_DONE> {
    payload: Photo[];
}

export interface FetchPhotosFailedAction
    extends Action<typeof FETCH_PHOTOS_DONE> {
    error: true;
    payload: Error;
}

export type AppAction =
    | FetchPhotosStartAction
    | FetchPhotosSuccessAction
    | FetchPhotosFailedAction;

// State types
export interface Photo {
    readonly id: string;
    readonly url: string;
    readonly title: string;
}

export interface AppState {
    photoIds: string[];
    photosById: { [id: string]: Photo };
    error?: Error;
    loading: boolean;
}
