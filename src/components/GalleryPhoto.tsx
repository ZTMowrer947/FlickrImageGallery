// Imports
import React from 'react';
import Figure from 'react-bootstrap/Figure';

import Photo from '../models/Photo';

// Prop Types
interface PropTypes {
    photo: Photo;
}

// Component
const GalleryPhoto: React.FC<PropTypes> = ({ photo }) => (
    <Figure className="d-flex flex-column align-items-center">
        <div className="photo-item overflow-hidden">
            <Figure.Image src={photo.url} />
        </div>
        <Figure.Caption>{photo.title}</Figure.Caption>
    </Figure>
);

// Export
export default React.memo(GalleryPhoto);
