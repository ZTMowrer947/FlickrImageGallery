// Imports
import { Reducer } from "redux";
import { tassign } from "tassign";
import EntityMap from "../EntityMap";
import {
    GalleryState,
    GalleryAction,
    FETCH_PHOTOS_START,
    FETCH_PHOTOS_DONE,
    Photo,
} from "./types";

// Initial gallery state
const initialState: GalleryState = {
    error: undefined,
    loading: false,
    photoIds: [],
    photosById: {},
};

// Reducer function
const gallery: Reducer<GalleryState, GalleryAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_PHOTOS_START:
            return tassign<GalleryState, Partial<GalleryState>>(state, {
                loading: true,
                error: undefined,
            });

        case FETCH_PHOTOS_DONE:
            if (action.error) {
                const error = action.payload as Error;

                return tassign<GalleryState, Partial<GalleryState>>(state, {
                    loading: false,
                    error,
                });
            }

            const photos = action.payload as Photo[];

            const photoIds = photos.map(photo => photo.id);
            const photosById = photos.reduce(
                (acc, photo) => tassign(acc, { [photo.id]: photo }),
                {} as EntityMap<Photo>
            );

            return tassign(state, {
                loading: false,
                photoIds,
                photosById,
            });

        default:
            return state;
    }
};

// Export
export default gallery;
