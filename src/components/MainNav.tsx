// Imports
import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Component
const MainNav: React.FC = () => (
    <nav>
        <Nav justify variant="pills" as="ul">
            <Nav.Item as="li">
                <LinkContainer to="/photos/dogs">
                    <Nav.Link>Dogs</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li">
                <LinkContainer to="/photos/cats">
                    <Nav.Link>Cats</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item as="li">
                <LinkContainer to="/photos/computers">
                    <Nav.Link>Computers</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
    </nav>
);

// Export
export default MainNav;
