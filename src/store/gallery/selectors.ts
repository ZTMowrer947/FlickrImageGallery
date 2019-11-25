// Imports
import { createSelector, Selector } from "reselect";
import AppState from "../AppState";
import EntityMap from "../EntityMap";
import { Photo } from "./types";

// Selectors
const photoIdSelector: Selector<AppState, string[]> = state =>
    state.gallery.photoIds;
const photosByIdSelector: Selector<AppState, EntityMap<Photo>> = state =>
    state.gallery.photosById;

export const getPhotos = createSelector(
    [photoIdSelector, photosByIdSelector],
    (photoIds, photosById) => photoIds.map(id => photosById[id])
);
