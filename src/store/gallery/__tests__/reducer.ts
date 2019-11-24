// Imports
import { tassign } from "tassign";
import { startPhotoFetch, finishPhotoFetch } from "../creators";
import { GalleryState, Photo } from "../types";
import galleryReducer from "../reducer";

// Test Suite
describe("Gallery reducer function", () => {
    it("should handle FETCH_PHOTOS_START", () => {
        // Define action arguments
        const tag = "dogs";

        // Create actions
        const action = startPhotoFetch(tag);

        // Define expected state
        const expectedState: GalleryState = {
            error: undefined,
            loading: true,
            photoIds: [],
            photosById: {},
        };

        // Compute actual state
        const actualState = galleryReducer(undefined, action);

        // Expect states to match
        expect(actualState).toStrictEqual(expectedState);
    });

    it("should handle successful FETCH_PHOTOS_DONE", () => {
        // Setup state
        const startingState = galleryReducer(
            undefined,
            startPhotoFetch("dogs")
        );

        // Define action arguments
        const photos: Photo[] = [
            {
                id: "123456",
                title: "Test Photo",
                url: "http://placehold.it/200x200",
            },
        ];

        // Create action
        const action = finishPhotoFetch(photos);

        // Define expected state
        const expectedState = tassign(startingState, {
            loading: false,
            photoIds: [photos[0].id],
            photosById: { [photos[0].id]: photos[0] },
        });

        // Compute actual state
        const actualState = galleryReducer(startingState, action);

        // Expect states to match
        expect(actualState).toStrictEqual(expectedState);
    });

    it("should handle failed FETCH_PHOTOS_DONE", () => {
        // Setup state
        const startingState = galleryReducer(
            undefined,
            startPhotoFetch("dogs")
        );

        // Define action arguments
        const error = new Error("Test error");

        // Create action
        const action = finishPhotoFetch([], error);

        // Define expected state
        const expectedState = tassign<GalleryState, Partial<GalleryState>>(
            startingState,
            {
                error,
                loading: false,
            }
        );

        // Compute actual state
        const actualState = galleryReducer(startingState, action);

        // Expect states to match
        expect(actualState).toStrictEqual(expectedState);
    });
});
