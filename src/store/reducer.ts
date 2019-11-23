// Import
import { connectRouter, RouterAction } from "connected-react-router";
import { History } from "history";
import { Reducer, combineReducers } from "redux";
import gallery from "./gallery";
import AppState from "./AppState";
import { GalleryAction } from "./gallery/types";

// Reducer factory
const createRootReducer = (
    history: History
): Reducer<AppState, RouterAction | GalleryAction> =>
    combineReducers({
        router: connectRouter(history),
        gallery,
    });

// Export
export default createRootReducer;
