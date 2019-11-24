// Imports
import { cold, hot } from "jest-marbles";
import { ActionsObservable, StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import AppState from "../../AppState";
import { startPhotoFetch, finishPhotoFetch } from "../creators";
import { Photo } from "../types";
import galleryEpic from "../epics";

// Test Suite
describe("Gallery epics", () => {
    it("should process a successful photo fetch", () => {
        // Setup action and state observables
        const action$ = new ActionsObservable(
            hot("-a", {
                a: startPhotoFetch("tag"),
            })
        );

        const state$ = new StateObservable(new Subject<AppState>(), {
            gallery: {
                error: undefined,
                loading: false,
                photosById: {},
                photoIds: [] as string[],
            },
            router: {
                location: {
                    pathname: "/",
                    search: "",
                    state: {},
                    hash: "",
                },
                action: "POP",
            },
        });

        // Define dependency mock
        const photos: Photo[] = [];

        for (let i = 0; i < 10; i++) {
            const id = Buffer.alloc(3, i).toString("hex");

            photos.push({
                id,
                title: `Test Photo ${i + 1}`,
                url: "http://placehold.it/200x200",
            });
        }

        const fetchPhotosMock = jest
            .fn()
            .mockReturnValue(cold("-a", { a: photos }));

        // Define expected observable
        const expected$ = cold("--a", {
            a: finishPhotoFetch(photos),
        });

        // Get actual observable
        const actual$ = galleryEpic(action$, state$, {
            fetchPhotos: fetchPhotosMock,
        });

        // Expect observables to match
        expect(actual$).toBeObservable(expected$);
    });

    it("should process a failed photo fetch", () => {
        // Setup action and state observables
        const action$ = new ActionsObservable(
            hot("-a", {
                a: startPhotoFetch("tag"),
            })
        );

        const state$ = new StateObservable(new Subject<AppState>(), {
            gallery: {
                error: undefined,
                loading: false,
                photosById: {},
                photoIds: [] as string[],
            },
            router: {
                location: {
                    pathname: "/",
                    search: "",
                    state: {},
                    hash: "",
                },
                action: "POP",
            },
        });

        // Define dependency mock
        const error = new Error("Test Error");

        const fetchPhotosMock = jest
            .fn()
            .mockReturnValue(cold("-#", null, error));

        // Define expected observable
        const expected$ = cold("--a", {
            a: finishPhotoFetch([], error),
        });

        // Get actual observable
        const actual$ = galleryEpic(action$, state$, {
            fetchPhotos: fetchPhotosMock,
        });

        // Expect observables to match
        expect(actual$).toBeObservable(expected$);
    });
});
