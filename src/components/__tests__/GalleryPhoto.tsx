// Imports
import { mount } from "enzyme";
import React from "react";
import { Photo } from "../../store/gallery/types";
import GalleryPhoto from "../GalleryPhoto";

describe("GalleryPhoto component", () => {
    let photo: Photo;

    beforeAll(() => {
        photo = {
            id: "abcdef",
            url: "http://placehold.it/200x200",
            title: "Test Photo",
        };
    });

    it("should render an image with the proper src and alt props", () => {
        // Mount component
        const wrapper = mount(<GalleryPhoto photo={photo} />);

        // Expect img to be rendered
        expect(wrapper.find("img")).toExist();
        expect(wrapper.find("img")).toHaveProp({
            src: photo.url,
            alt: photo.title,
        });
    });
});
