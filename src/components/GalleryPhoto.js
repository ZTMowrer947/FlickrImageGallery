// Imports
import React from "react";
import PropTypes from "prop-types";

// Component
const GalleryPhoto = ({ photoUrl }) => (
    <img src={photoUrl} />
)

// Prop Types
GalleryPhoto.propTypes = {
    photoUrl: PropTypes.string.isRequired
};

// Export
export default GalleryPhoto;
