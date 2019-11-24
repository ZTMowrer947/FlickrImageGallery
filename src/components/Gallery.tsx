// Imports
import React from "react";
import { Col, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { Photo } from "../store/gallery/types";
import GalleryPhoto from "./GalleryPhoto";
import "./Gallery.scss";

// Prop Types
interface PropTypes {
    photos: Photo[];
    isLoading: boolean;
    fetchPhotos: (tag: string) => void;
}

interface MatchParams {
    tag: string;
}

// Component
class Gallery extends React.PureComponent<
    PropTypes & RouteComponentProps<MatchParams>
> {
    componentDidMount(): void {
        this.props.fetchPhotos(this.props.match.params.tag);
    }

    render(): React.ReactNode {
        if (this.props.isLoading) return <h1>Loading...</h1>;

        const photos = this.props.photos.map(photo => (
            <Col as="li" sm={6} md={4} lg={3} xl={2} key={photo.id}>
                <GalleryPhoto photo={photo} />
            </Col>
        ));

        return (
            <Row as="ul" className="photo-container">
                {photos}
            </Row>
        );
    }
}

// Exports
export { PropTypes as GalleryPropTypes, Gallery as default };
