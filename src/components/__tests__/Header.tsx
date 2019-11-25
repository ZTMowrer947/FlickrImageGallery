// Imports
import { mount } from "enzyme";
import React from "react";
import { StaticRouter } from "react-router-dom";
import Header from "../Header";
import MainNav from "../MainNav";

// Fixture setup
interface PropTypes {
    activePath: string;
}

const Fixture: React.FC<PropTypes> = ({ activePath }) => (
    <StaticRouter location={activePath}>
        <Header />
    </StaticRouter>
);

// Test Suite
describe("Header component", () => {
    it("should render a heading and the main navigation", () => {
        // Mount fixture component
        const wrapper = mount(<Fixture activePath="/" />);

        // Expect header to have heading
        expect(wrapper.find("h1")).toMatchElement(
            <h1>Flickr Image Gallery</h1>
        );

        // Expect wrapper to contain main navigation
        expect(wrapper).toContainReact(<MainNav />);
    });
});
