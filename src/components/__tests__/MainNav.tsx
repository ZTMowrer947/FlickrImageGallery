// Import
import "jest-enzyme";
import { mount } from "enzyme";
import React from "react";
import { StaticRouter } from "react-router-dom";
import MainNav from "../MainNav";

// Fixture setup
interface PropTypes {
    activePath: string;
}

const Fixture: React.FC<PropTypes> = ({ activePath }) => (
    <StaticRouter location={activePath}>
        <MainNav />
    </StaticRouter>
);

// Test Suite
describe("MainNav component", () => {
    it("should render a nav menu with 3 links", () => {
        const wrapper = mount(<Fixture activePath="/" />);

        expect(wrapper.find("nav")).toExist();
        expect(wrapper.find("ul.nav")).toContainMatchingElements(3, "li");
        expect(wrapper.find("ul.nav")).toContainMatchingElements(3, "a");
    });
});
