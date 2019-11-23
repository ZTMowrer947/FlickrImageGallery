// Imports
import React from "react";
import Container from "react-bootstrap/Container";
import { hot } from "react-hot-loader/root";
import Header from "./components/Header";

// Component
const App: React.FC = () => (
    <Container fluid>
        <Header />
        <h1>Hello, World!</h1>
    </Container>
);

// Export
export default hot(App);
