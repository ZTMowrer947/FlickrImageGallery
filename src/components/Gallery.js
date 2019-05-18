// Imports
import React from "react";
import PropTypes from "prop-types";
import GalleryPhoto from "./GalleryPhoto";

// Component
const Gallery = ({ photos }) => {
    const galleryPhotos = photos.map(({ farm, id, secret, server, title}) => {
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

        return (
            <li key={id}>
                <GalleryPhoto photoUrl={url} title={title} />
            </li>
        );
    })

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {galleryPhotos}
            </ul>
        </div>
    );
};

// Prop Types
Gallery.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
        farm: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        secret: PropTypes.string.isRequired,
        server: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })),
}

// Export
export default Gallery;
