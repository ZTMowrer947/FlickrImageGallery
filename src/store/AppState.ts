// Imports
import { RouterState } from "connected-react-router";
import { GalleryState } from "./gallery/types";

// State
interface AppState {
    readonly gallery: GalleryState;
    readonly router: RouterState;
}

// Export
export default AppState;
