// Imports
import { isFSA, isError } from "flux-standard-action";
import {
    FETCH_PHOTOS_START,
    FETCH_PHOTOS_DONE,
    FetchPhotosStartAction,
    FetchPhotosSuccessAction,
    FetchPhotosFailedAction,
    Photo,
} from "../types";
import { startPhotoFetch, finishPhotoFetch } from "../creators";

// Test Suite
describe("Gallery action creators", () => {
    describe("startPhotoFetch", () => {
        it("should create an FSA of type FETCH_PHOTOS_START", () => {
            // Define action arguments
            const tag = "redux";

            // Create expected action
            const expectedAction: FetchPhotosStartAction = {
                type: FETCH_PHOTOS_START,
                meta: { tag },
            };

            // Create action using action creator
            const actualAction = startPhotoFetch(tag);

            // Expect action to be FSA-compliant
            expect(isFSA(actualAction)).toBe(true);

            // Expect actions to match
            expect(actualAction).toStrictEqual(expectedAction);
        });
    });

    describe("finishPhotoFetch", () => {
        it("should, when not passed an error, create an FSA of type FETCH_PHOTOS_START", () => {
            // Define action arguments
            const photos: Photo[] = [
                {
                    id: "123456",
                    url: "http://placehold.it/200x200",
                    title: "Test Photo",
                },
            ];

            // Create expected action
            const expectedAction: FetchPhotosSuccessAction = {
                type: FETCH_PHOTOS_DONE,
                payload: photos,
            };

            // Create action using action creator
            const actualAction = finishPhotoFetch(photos);

            // Expect action to be FSA-compliant
            expect(isFSA(actualAction)).toBe(true);

            // Expect actions to match
            expect(actualAction).toStrictEqual(expectedAction);
        });

        it("should, when passed an error, create an error FSA of type FETCH_PHOTOS_START", () => {
            // Define action arguments
            const photos: Photo[] = [];
            const error = new Error("Test error");

            // Create expected action
            const expectedAction: FetchPhotosFailedAction = {
                type: FETCH_PHOTOS_DONE,
                error: true,
                payload: error,
            };

            // Create action using action creator
            const actualAction = finishPhotoFetch(photos, error);

            // Expect action to be FSA-compliant
            expect(isFSA(actualAction)).toBe(true);

            // Expect action to represent an error
            expect(isError(actualAction)).toBe(true);

            // Expect actions to match
            expect(actualAction).toStrictEqual(expectedAction);
        });
    });
});
