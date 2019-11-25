// Imports
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import Gallery, { GalleryPropTypes } from "../components/Gallery";
import AppState from "../store/AppState";
import { startPhotoFetch } from "../store/gallery";
import { getPhotos } from "../store/gallery/selectors";

// Redux state-to-prop mapping
const mapStateToProps: MapStateToProps<
    Omit<GalleryPropTypes, "fetchPhotos">,
    {},
    AppState
> = state => ({
    photos: getPhotos(state),
    isLoading: state.gallery.loading,
});

const mapDispatchToProps: MapDispatchToProps<
    Pick<GalleryPropTypes, "fetchPhotos">,
    {}
> = dispatch => ({
    fetchPhotos: tag => {
        dispatch(startPhotoFetch(tag));
    },
});

// Redux connection
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
