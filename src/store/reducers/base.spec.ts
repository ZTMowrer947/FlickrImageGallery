// Imports
import produce from 'immer';

import Photo from '../../models/Photo';
import {
    startPhotoFetch,
    photoFetchSuccess,
    photoFetchFailed,
} from '../actions';
import baseReducer, { BaseState } from './base';

// Test Suite
describe('Base reducer', () => {
    let state: BaseState;

    // Setup
    beforeEach(() => {
        // Initialize state
        state = {
            isFetching: false,
            error: null,
        };
    });

    // Tests
    it(`should handle ${startPhotoFetch.type}`, () => {
        // Setup test state
        const testState = produce(state, draft => {
            // Attach error
            draft.error = new Error();
        });

        // Define action arguments
        const tagId = 'undertale';

        // Define expected state
        const expectedState = produce(testState, draft => {
            // Fetching state should be set
            draft.isFetching = true;

            // Error should be cleared
            draft.error = null;
        });

        // Create action
        const action = startPhotoFetch(tagId);

        // Compute actual state
        const actualState = baseReducer(testState, action);

        // Expect states to match
        expect(actualState).toStrictEqual(expectedState);
    });

    it(`should handle ${photoFetchSuccess.type}`, () => {
        // Setup test state
        const testState = produce(state, draft => {
            // Set fetching state
            draft.isFetching = true;
        });

        // Define action arguments
        const tagId = 'undertale';
        const photos: Photo[] = [];

        for (let i = 0; i < 10; i++) {
            const photo: Photo = {
                id: i.toString(),
                url: 'http://placehold.it/200x200',
                title: 'A placeholder image',
            };

            photos.push(photo);
        }

        // Define expected state
        const expectedState = produce(testState, draft => {
            // Fetching state should be unset
            draft.isFetching = false;
        });

        // Create action
        const action = photoFetchSuccess(tagId, photos);

        // Compute actual state
        const actualState = baseReducer(testState, action);

        // Expect states to match
        expect(actualState).toStrictEqual(expectedState);
    });

    it(`should handle ${photoFetchFailed.type}`, () => {
        // Setup test state
        const testState = produce(state, draft => {
            // Set fetching state
            draft.isFetching = true;
        });

        // Define action arguments
        const error = new Error();

        // Define expected state
        const expectedState = produce(testState, draft => {
            // Fetching state should be unset
            draft.isFetching = false;

            // Error should be attached to state
            draft.error = error;
        });

        // Create action
        const action = photoFetchFailed(error);

        // Compute actual state
        const actualState = baseReducer(testState, action);

        // Expect states to match
        expect(actualState).toStrictEqual(expectedState);
    });
});
