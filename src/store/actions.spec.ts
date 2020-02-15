// Imports
import {
    startPhotoFetch,
    photoFetchSuccess,
    photoFetchFailed,
} from './actions';
import Photo from '../models/Photo';
import Tag from '../models/Tag';

// Test Suite
describe('Action creators', () => {
    test(`startPhotoFetch should create a ${startPhotoFetch.type} action`, () => {
        // Define action arguments
        const tagId = 'undertale';

        // Define expected action
        const expected = {
            type: startPhotoFetch.type,
            payload: tagId,
        };

        // Create actual action
        const actual = startPhotoFetch(tagId);

        // Expect actions to match
        expect(actual).toStrictEqual(expected);
    });

    test(`photoFetchSuccess should create an ${photoFetchSuccess.type} action`, () => {
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

        // Define tag
        const tag: Tag = {
            id: tagId,
            photoIds: photos.map(photo => photo.id),
        };

        // Define expected action
        const expected = {
            type: photoFetchSuccess.type,
            payload: {
                tag,
                photos,
            },
        };

        // Create actual action
        const actual = photoFetchSuccess(tagId, photos);

        // Expect actions to match
        expect(actual).toStrictEqual(expected);
    });

    test(`photoFetchFailed should create an ${photoFetchFailed.type} action`, () => {
        // Define action arguments
        const error = new Error();

        // Define expected action
        const expected = {
            type: photoFetchFailed.type,
            payload: error,
            error: true,
        };

        // Create actual action
        const actual = photoFetchFailed(error);

        // Expect actions to match
        expect(actual).toStrictEqual(expected);
    });
});
