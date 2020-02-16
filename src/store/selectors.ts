// Imports
import { createSelector } from '@reduxjs/toolkit';
import { ParametricSelector, Selector } from 'reselect';

import { RootState } from './reducers';
import Photo from '../models/Photo';

// Prop Types
interface SelectPhotosPropTypes {
    tag: string;
}

// Input Selectors
const selectPhotoIdsWithTag: ParametricSelector<
    RootState,
    SelectPhotosPropTypes,
    string[]
> = (state, { tag }) => {
    // If state has data for this tag,
    if (tag in state.tag.byId) {
        // Return the photo ids associated with this tag
        return state.tag.byId[tag].photoIds;
    }

    // Otherwise, return empty array
    return [];
};

const selectPhotosById: Selector<RootState, Record<string, Photo>> = state =>
    state.photo.byId;

// Output Selectors
export function makeSelectPhotosWithTag() {
    return createSelector(
        [selectPhotoIdsWithTag, selectPhotosById],
        (photoIdsWithTag, photosById) => {
            return photoIdsWithTag.map(photoId => photosById[photoId]);
        }
    );
}
