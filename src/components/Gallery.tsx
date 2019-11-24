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

    componentDidUpdate(
        prevProps: PropTypes & RouteComponentProps<MatchParams>
    ): void {
        if (
            this.props.match.params.tag !== prevProps.match.params.tag &&
            !this.props.isLoading
        ) {
            this.props.fetchPhotos(this.props.match.params.tag);
        }
    }

    render(): React.ReactNode {
        if (this.props.isLoading) return <h1>Loading...</h1>;

        const photos = this.props.photos.map(photo => (
            <Col
                className="photo-item"
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={photo.id}
            >
                <GalleryPhoto photo={photo} />
            </Col>
        ));

        return (
            <>
                <h1>Results for &quot;{this.props.match.params.tag}&quot;:</h1>
                <Row className="photo-container">{photos}</Row>
            </>
        );
    }
}

// Exports
export { PropTypes as GalleryPropTypes, Gallery as default };
