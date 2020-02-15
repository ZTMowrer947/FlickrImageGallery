// Imports
import produce from 'immer';

import Photo from '../../models/Photo';
import Tag from '../../models/Tag';
import { photoFetchSuccess } from '../actions';
import tagReducer, { TagState } from './tag';

// Test Suite
describe('Tag reducer', () => {
    let state: TagState;

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
            // Create tag
            const tag: Tag = {
                id: tagId,
                photoIds: photos.map(photo => photo.id),
            };

            // Insert tag id into id array
            draft.allIds.push(tagId);

            // Insert tag into by-id record
            draft.byId[tagId] = tag;
        });

        // Create action
        const action = photoFetchSuccess(tagId, photos);

        // Compute actual state
        const actualState = tagReducer(state, action);

        // Expect states to match
        expect(actualState).toStrictEqual(expectedState);
    });
});
