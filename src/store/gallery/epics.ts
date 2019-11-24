// Imports
import { Epic, combineEpics } from "redux-observable";
import { Observable, of } from "rxjs";
import { filter, mergeMap, map, catchError } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import AppState from "../AppState";
import {
    FetchPhotosFailedAction,
    FetchPhotosSuccessAction,
    GalleryAction,
    Photo,
    FETCH_PHOTOS_START,
} from "./types";
import { finishPhotoFetch } from "./creators";

// Dependency Types
export interface FetchPhotosEpicDeps {
    fetchPhotos: (tag: string) => Observable<Photo[]>;
}

// Epic Types
type FetchPhotosEpic = Epic<
    GalleryAction,
    FetchPhotosSuccessAction | FetchPhotosFailedAction,
    AppState,
    FetchPhotosEpicDeps
>;

// Epics
const fetchPhotosEpic: FetchPhotosEpic = (action$, state$, { fetchPhotos }) =>
    action$.pipe(
        filter(isOfType(FETCH_PHOTOS_START)),

        mergeMap(action => {
            return fetchPhotos(action.meta.tag).pipe(
                map(photos => finishPhotoFetch(photos)),
                catchError(error => of(finishPhotoFetch([], error)))
            );
        })
    );

// Compose epics into one
const galleryEpic = combineEpics(fetchPhotosEpic);

// Export
export default galleryEpic;
