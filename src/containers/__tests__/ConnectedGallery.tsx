// Imports
import { RouterAction } from "connected-react-router";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { StaticRouter, Route } from "react-router-dom";
import { Store } from "redux";
import AppState from "../../store/AppState";
import { GalleryAction } from "../../store/gallery/types";
import configureStore from "../../store";
import ConnectedGallery from "../ConnectedGallery";
import { startPhotoFetch } from "../../store/gallery";

// Mocks
jest.mock("../../services/fetchPhotos.ts");

// Fixture setup
interface PropTypes {
    tag: string;
    store: Store<AppState, GalleryAction | RouterAction>;
}

const Fixture: React.FC<PropTypes> = ({ tag, store }) => {
    return (
        <Provider store={store}>
            <StaticRouter location={`/photos/${tag}`}>
                <Route path="/photos/:tag" component={ConnectedGallery} />
            </StaticRouter>
        </Provider>
    );
};

// Test Suite
describe("ConnectedGallery container component", () => {
    let store: Store<AppState, GalleryAction | RouterAction>;

    beforeAll(() => {
        store = configureStore();
    });

    it("should use Redux to fetch photo data and display the recieved data", () => {
        const tag = "dogs";
        const dispatchSpy = jest.spyOn(store, "dispatch");
        const wrapper = mount(<Fixture store={store} tag="dogs" />);

        // Expect dispatch function to have been called to start photo fetch
        expect(dispatchSpy).toHaveBeenCalledWith(startPhotoFetch(tag));

        // Expect there to be 10 photos rendered
        expect(wrapper).toContainMatchingElements(10, "img");
    });
});
