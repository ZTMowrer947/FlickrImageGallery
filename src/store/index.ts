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
import AppState from "./AppState";
import { GalleryAction } from "./gallery/types";
import createRootReducer from "./reducer";

// History setup
export const history = createBrowserHistory();

// Store factory
const configureStore = (): Store<AppState, RouterAction | GalleryAction> => {
    // Define middleware list and enhancer
    const middleware: Middleware[] = [routerMiddleware(history)];
    const middlewareEnhancer = applyMiddleware(...middleware);

    // Define enhancer list and composed enhancer
    const enhancers: StoreEnhancer[] = [middlewareEnhancer];
    const enhancer: StoreEnhancer = composeWithDevTools(...enhancers);

    // Create root reducer
    const reducer = createRootReducer(history);

    // Create Redux store
    const store = createStore(reducer, enhancer);

    // Return created store
    return store;
};

// Export
export default configureStore;
