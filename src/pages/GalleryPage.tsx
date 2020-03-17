// Imports
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Gallery from '../components/Gallery';
import Loading from '../components/Loading';
import Photo from '../models/Photo';
import { makeSelectPhotosWithTag } from '../store/selectors';
import { AppDispatch } from '../store';
import { RootState } from '../store/reducers';
import { fetchPhotosIfNeeded } from '../store/thunks';

// Prop Types
interface MatchParams {
    tag: string;
}

type PropTypes = RouteComponentProps<MatchParams>;

// Page component
const GalleryPage: React.FC<PropTypes> = ({ match }) => {
    // Get tag from match params
    const { tag } = match.params;

    // Create and memoize photo selector
    const selectPhotosWithTag = useMemo(makeSelectPhotosWithTag, []);

    // Select photos from state
    const photos = useSelector<RootState, Photo[]>(state =>
        selectPhotosWithTag(state, { tag })
    );

    // Select fetching and error states
    const isFetching = useSelector<RootState, boolean>(
        state => state.isFetching
    );

    // Get dispatch function
    const dispatch = useDispatch<AppDispatch>();

    // Fetch photos if needed
    useEffect(() => {
        // Fetch photos with tag if none are present in state
        dispatch(fetchPhotosIfNeeded(tag));
    }, [dispatch, tag]);

    // If we are loading, render spinner after 200ms delay
    if (isFetching) {
        return <Loading delay={200} />;
    } else {
        // Otherwise, render gallery
        return <Gallery photos={photos} tag={tag} />;
    }
};

// Export
export default GalleryPage;
