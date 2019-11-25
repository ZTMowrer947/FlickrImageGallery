// Imports
import {
    FSAWithMeta,
    FSAWithPayload,
    ErrorFSAWithPayload,
} from "flux-standard-action";
import EntityMap from "../EntityMap";

// Action types
export const FETCH_PHOTOS_START = "FETCH_PHOTOS_START";
export const FETCH_PHOTOS_DONE = "FETCH_PHOTOS_DONE";

interface FetchPhotosStartMeta {
    tag: string;
}

export type FetchPhotosStartAction = FSAWithMeta<
    typeof FETCH_PHOTOS_START,
    undefined,
    FetchPhotosStartMeta
>;

export type FetchPhotosSuccessAction = FSAWithPayload<
    typeof FETCH_PHOTOS_DONE,
    Photo[]
>;

export type FetchPhotosFailedAction = ErrorFSAWithPayload<
    typeof FETCH_PHOTOS_DONE,
    Error
>;

export type GalleryAction =
    | FetchPhotosStartAction
    | FetchPhotosSuccessAction
    | FetchPhotosFailedAction;

// State types
export interface Photo {
    readonly id: string;
    readonly url: string;
    readonly title: string;
}

export interface GalleryState {
    photoIds: string[];
    photosById: EntityMap<Photo>;
    error?: Error;
    loading: boolean;
}
