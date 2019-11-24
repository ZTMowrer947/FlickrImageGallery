// Imports
import { combineEpics } from "redux-observable";
import galleryEpic from "./gallery/epics";

// Root epic
const rootEpic = combineEpics(galleryEpic);

// Export
export default rootEpic;
