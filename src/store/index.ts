// Imports
import { RouterAction, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import {
    Store,
    Middleware,
    applyMiddleware,
    createStore,
    StoreEnhancer,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";
import fetchPhotos from "../services/fetchPhotos";
import AppState from "./AppState";
import { GalleryAction } from "./gallery/types";
import createRootReducer from "./reducer";
import rootEpic from "./epic";

// History setup
export const history = createBrowserHistory();

// Store factory
const configureStore = (): Store<AppState, RouterAction | GalleryAction> => {
    // Create root reducer
    const reducer = createRootReducer(history);

    // Create epic subject
    const epic$ = new BehaviorSubject(rootEpic);

    // Create HMR epic
    const hmrEpic: typeof rootEpic = (...args) =>
        epic$.pipe(switchMap(epic => epic(...args)));

    // Create epic middleware
    const epicMiddleware = createEpicMiddleware<
        GalleryAction,
        GalleryAction,
        AppState
    >({
        dependencies: {
            fetchPhotos,
        },
    });

    // Define middleware list and enhancer
    const middleware: Middleware[] = [
        routerMiddleware(history),
        epicMiddleware,
    ];
    const middlewareEnhancer = applyMiddleware(...middleware);

    // Define enhancer list and composed enhancer
    const enhancers: StoreEnhancer[] = [middlewareEnhancer];
    const enhancer: StoreEnhancer = composeWithDevTools(...enhancers);

    // Create Redux store
    const store = createStore(reducer, enhancer);

    // Run root epic
    epicMiddleware.run(hmrEpic);

    // HMR Setup
    if (module.hot && process.env.NODE_ENV !== "production") {
        // Reducers
        module.hot.accept("./reducer", async () => {
            // Import new root reducer factory
            const { default: createNewRootReducer } = await import("./reducer");

            // Create new root reducer
            const newReducer = createNewRootReducer(history);

            // Replace reducer
            store.replaceReducer(newReducer);
        });

        // Epics
        module.hot.accept("./epic", async () => {
            // Import new root epic
            const { default: newRootEpic } = await import("./epic");

            // Load new root epic into subject
            epic$.next(newRootEpic);
        });
    }

    // Return created store
    return store;
};

// Export
export default configureStore;
