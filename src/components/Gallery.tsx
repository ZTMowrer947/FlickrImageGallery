// Imports
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Photo } from "../store/gallery/types";

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
        return <></>;
    }
}

// Exports
export { PropTypes as GalleryPropTypes, Gallery as default };
