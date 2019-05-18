// Imports
import React from "react";
import PropTypes from "prop-types";
import GalleryPhoto from "./GalleryPhoto";
import LoadingIndicator from "./LoadingIndicator";

// Component
const Gallery = ({ photos, isLoading, tag }) => {
    // If we are still loading,
    if (isLoading) {
        // Render a loading indicator
        return (
            <div className="photo-container">
                <h2>Loading...</h2>
                <LoadingIndicator />
            </div>
        );
    }

    // Map photo data to GalleryPhoto components
    const galleryPhotos = photos.map(({ farm, id, secret, server, title}) => {
        // Craft URL for photo
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

        // Return list item containing GalleryPhoto
        return (
            <li key={id}>
                <GalleryPhoto photoUrl={url} title={title} />
            </li>
        );
    })
    
    // Message in case there are no results
    const noResultsMessage = (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>You search did not return any results. Please try again.</p>
        </li>
    )

    // Return the photo container
    return (
        <div className="photo-container">
            <h2>Results for "{tag}"</h2>
            <ul>
                {/* Render photo gallery if we have any photos, and render the no results message otherwise */}
                {galleryPhotos.length > 0 ? galleryPhotos: noResultsMessage}
            </ul>
        </div>
    );
};

// Prop Types
Gallery.propTypes = {
    // Whether or not we are loading something
    isLoading: PropTypes.bool.isRequired,
    // Photo data
    photos: PropTypes.arrayOf(PropTypes.shape({
        farm: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        secret: PropTypes.string.isRequired,
        server: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })),
    // The tag that was selected
    tag: PropTypes.string.isRequired,
}

// Export
export default Gallery;
