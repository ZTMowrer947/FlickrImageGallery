// Imports
import produce from 'immer';

import Photo from '../../models/Photo';
import { photoFetchSuccess } from '../actions';
import photoReducer, { PhotoState } from './photo';

// Test SUite
describe('Photo reducer', () => {
    let state: PhotoState;

    // Setup
    beforeEach(() => {
        // Initialize state
        state = {
            allIds: [],
            byId: {},
        };
    });

    // Tests
    it(`should handle ${photoFetchSuccess.type}`, () => {
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
        const expectedState = produce(state, draft => {
            // For each photo,
            photos.forEach(photo => {
                // Insert id into id array
                draft.allIds.push(photo.id);

                // Insert photo into by-id record
                draft.byId[photo.id] = photo;
            });
        });

        // Create action
        const action = photoFetchSuccess(tagId, photos);

        // Compute actual state
        const actualState = photoReducer(state, action);

        // Expect states to match
        expect(actualState).toStrictEqual(expectedState);
    });
});
