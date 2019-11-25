// Imports
import { mount } from "enzyme";
import React from "react";
import { StaticRouter, Route } from "react-router-dom";
import Gallery, { GalleryPropTypes } from "../Gallery";
import { Photo } from "../../store/gallery/types";
import LoadingIndicator from "../LoadingIndicator";

// Fixture setup
interface PropTypes extends GalleryPropTypes {
    tag: string;
}

const Fixture: React.FC<PropTypes> = ({ tag, ...galleryProps }) => {
    return (
        <StaticRouter location={`/photos/${tag}`}>
            <Route
                path="/photos/:tag"
                render={routeProps => (
                    <Gallery {...routeProps} {...galleryProps} />
                )}
            />
        </StaticRouter>
    );
};

// Test Suite
describe("Gallery component", () => {
    let photos: Photo[];
    let tag: string;
    let isLoading: boolean;
    let fetchPhotosMock: jest.Mock;

    beforeAll(() => {
        // Initialize props
        tag = "dogs";
        photos = [];
        isLoading = false;
        fetchPhotosMock = jest.fn();

        for (let i = 0; i < 10; i++) {
            const id = Buffer.alloc(3, i ** 2).toString("hex");

            photos.push({
                id,
                title: `Test Photo ${i + 1}`,
                url: "http://placehold.it/200x200",
            });
        }
    });

    afterEach(() => {
        // Clear mock
        fetchPhotosMock.mockClear();
    });

    it("should render photo listing when not loading", () => {
        // Mount fixture
        const wrapper = mount(
            <Fixture
                tag={tag}
                photos={photos}
                fetchPhotos={fetchPhotosMock}
                isLoading={isLoading}
            />
        );

        // Expect fetch photos mock to have been called
        expect(fetchPhotosMock).toHaveBeenCalled();

        // Expect fixture to have rendered results heading
        expect(wrapper).toContainReact(<h1>Results for &quot;{tag}&quot;:</h1>);

        // Expect fixture to have rendered the correct number of photos
        expect(wrapper).toContainMatchingElements(photos.length, "img");
    });

    it("should render loading indicator when loading", () => {
        // Set isLoading to true
        isLoading = true;

        // Mount fixture
        const wrapper = mount(
            <Fixture
                tag={tag}
                photos={photos}
                fetchPhotos={fetchPhotosMock}
                isLoading={isLoading}
            />
        );

        // Expect fixture to have only rendered loading indicator
        expect(wrapper).toContainReact(<LoadingIndicator />);
    });
});
