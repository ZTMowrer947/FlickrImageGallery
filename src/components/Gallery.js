// Imports
import React from "react";
import PropTypes from "prop-types";
import GalleryPhoto from "./GalleryPhoto";
import LoadingIndicator from "./LoadingIndicator";

// Component
const Gallery = ({ photos, isLoading }) => {
    if (isLoading) {
        return (
            <div className="photo-container">
                <h2>Loading...</h2>
                <LoadingIndicator />
            </div>
        );
    }

    const galleryPhotos = photos.map(({ farm, id, secret, server, title}) => {
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

        return (
            <li key={id}>
                <GalleryPhoto photoUrl={url} title={title} />
            </li>
        );
    })

    const noResultsMessage = (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>You search did not return any results. Please try again.</p>
        </li>
    )

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {galleryPhotos.length > 0 ? galleryPhotos: noResultsMessage}
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
