// Imports
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Photo from '../models/Photo';
import GalleryPhoto from './GalleryPhoto';

import './Gallery.css';

// Prop Types
interface PropTypes {
    photos: Photo[];
    tag: string;
}

// Component
const Gallery: React.FC<PropTypes> = ({ photos, tag }) => {
    // Map photos into gallery items
    const photoItems = photos.map(photo => (
        <Col sm={6} md={4} lg={3} xl={2} key={photo.id}>
            <GalleryPhoto photo={photo} />
        </Col>
    ));

    // Define item if no results are found
    const noResultsItem = (
        <div className="not-found d-flex flex-column align-items-center">
            <h3>No Results Found</h3>
            <p>Your search did not return any results.</p>
        </div>
    );

    // Render gallery
    return (
        <>
            <h1>Results for &quot;{tag}&quot;:</h1>
            <Row>{photos.length > 0 ? photoItems : noResultsItem}</Row>
        </>
    );
};

// Export
export default Gallery;
