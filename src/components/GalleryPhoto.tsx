// Imports
import React from "react";
import { Photo } from "../store/gallery/types";

// Prop Types
interface PropTypes {
    photo: Photo;
}

// Component
const GalleryPhoto: React.FC<PropTypes> = ({ photo }) => (
    <img src={photo.url} alt={photo.title} />
);

// Export
export default React.memo(GalleryPhoto);
