// Imports
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureMockStore from 'redux-mock-store';
import { serializeError } from 'serialize-error';
import { mocked } from 'ts-jest/utils';

import Photo from '../models/Photo';
import fetchPhotos from '../services/fetchPhotos';
import { AppDispatch } from '.';
import { fetchPhotosByTag, fetchPhotosIfNeeded } from './thunks';
import {
    startPhotoFetch,
    photoFetchSuccess,
    photoFetchFailed,
} from './actions';
import { RootState } from './reducers';

// Mock setup
jest.mock('../services/fetchPhotos');
const mockStore = configureMockStore(getDefaultMiddleware());

// Test Suite
describe('Thunks', () => {
    // Teardown
    afterEach(() => {
        // Clear fetchPhotos mock
        mocked(fetchPhotos).mockClear();
    });

    describe('fetchPhotosByTag', () => {
        it('should fetch a list of photos with the given tag', async () => {
            // Define tag and photo data
            const tag = 'undertale';
            const photos: Photo[] = [];

            for (let i = 0; i < 10; i++) {
                const photo: Photo = {
                    id: i.toString(),
                    url: 'http://placehold.it/200x200',
                    title: 'A placeholder image',
                };

                photos.push(photo);
            }

            // Define expected action list
            const expectedActions = [
                { type: startPhotoFetch.type, payload: tag },
                {
                    type: photoFetchSuccess.type,
                    payload: {
                        tag: {
                            id: tag,
                            photoIds: photos.map(photo => photo.id),
                        },
                        photos,
                    },
                },
            ];

            // Setup fetchPhotos mock to return photo data
            mocked(fetchPhotos).mockResolvedValue(photos);

            // Create store
            const store = mockStore();

            // Invoke thunk
            await (store.dispatch as AppDispatch)(fetchPhotosByTag(tag));

            // Expect fetchPhotos mock to have been called
            expect(fetchPhotos).toHaveBeenCalled();

            // Get actual list of actions
            const actualActions = store.getActions();

            // Expect action lists to match
            expect(actualActions).toStrictEqual(expectedActions);
        });

        it('should dispatch a failure action if the photo fetching service throws an error', async () => {
            // Define tag and error
            const tag = 'undertale';
            const error = new Error();

            // Setup fetchPhotos mock to reject with error
            mocked(fetchPhotos).mockRejectedValue(error);

            // Define expected action list
            const expectedActions = [
                { type: startPhotoFetch.type, payload: tag },
                {
                    type: photoFetchFailed.type,
                    payload: serializeError(error),
                    error: true,
                },
            ];

            // Create store
            const store = mockStore();

            // Invoke thunk
            await (store.dispatch as AppDispatch)(fetchPhotosByTag(tag));

            // Expect fetchPhotos mock to have been called
            expect(fetchPhotos).toHaveBeenCalled();

            // Get actual list of actions
            const actualActions = store.getActions();

            // Expect action lists to match
            expect(actualActions).toStrictEqual(expectedActions);
        });
    });

    describe('fetchPhotosIfNeeded', () => {
        let tag: string;
        let photos: Photo[];
        let initialState: RootState;

        // Setup
        beforeAll(() => {
            // Define tag
            tag = 'undertale';

            // Generate photos
            photos = [];

            for (let i = 0; i < 10; i++) {
                const photo: Photo = {
                    id: i.toString(),
                    url: 'http://placehold.it/200x200',
                    title: 'A placeholder image',
                };

                photos.push(photo);
            }

            const photoIds = photos.map(photo => photo.id);
            const photosById: Record<string, Photo> = {};

            // Insert photos into record
            photos.forEach(photo => {
                photosById[photo.id] = photo;
            });

            // Define initial state
            initialState = {
                isFetching: false,
                error: null,
                tag: {
                    byId: {
                        [tag]: {
                            id: tag,
                            photoIds,
                        },
                    },
                    allIds: [tag],
                },
                photo: {
                    byId: photosById,
                    allIds: photoIds,
                },
            };
        });

        // Tests
        it('should not fetch photo data for a tag if already present in state', async () => {
            // Setup fetchPhotos mock to return photo data
            mocked(fetchPhotos).mockResolvedValue(photos);

            // Create store
            const store = mockStore(initialState);

            // Invoke thunk
            await (store.dispatch as AppDispatch)(fetchPhotosIfNeeded(tag));

            // Expect fetchPhotos mock to have not been called
            expect(fetchPhotos).not.toHaveBeenCalled();

            // Expect store to have not dispatched any actions
            expect(store.getActions()).toHaveLength(0);
        });

        it('should fetch photo data for a tag if not already present in state', async () => {
            // Define alternate tag
            const altTag = 'underswap';

            // Define expected action list
            const expectedActions = [
                { type: startPhotoFetch.type, payload: altTag },
                {
                    type: photoFetchSuccess.type,
                    payload: {
                        tag: {
                            id: altTag,
                            photoIds: photos.map(photo => photo.id),
                        },
                        photos,
                    },
                },
            ];

            // Setup fetchPhotos mock to return photo data
            mocked(fetchPhotos).mockResolvedValue(photos);

            // Create store
            const store = mockStore(initialState);

            // Invoke thunk
            await (store.dispatch as AppDispatch)(fetchPhotosIfNeeded(altTag));

            // Expect fetchPhotos mock to have been called
            expect(fetchPhotos).toHaveBeenCalled();

            // Get actual list of actions
            const actualActions = store.getActions();

            // Expect action lists to match
            expect(actualActions).toStrictEqual(expectedActions);
        });
    });
});
