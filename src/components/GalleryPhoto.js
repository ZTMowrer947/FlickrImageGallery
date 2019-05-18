// Imports
import React from "react";
import PropTypes from "prop-types";

// Component
const GalleryPhoto = ({ photoUrl, title }) => (
    <img src={photoUrl} alt={title} />
)

// Prop Types
GalleryPhoto.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

// Export
export default GalleryPhoto;
