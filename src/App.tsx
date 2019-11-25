// Imports
import React from "react";
import Container from "react-bootstrap/Container";
import { hot } from "react-hot-loader/root";
import { Switch, Redirect, Route } from "react-router-dom";
import Header from "./components/Header";
import ConnectedGallery from "./containers/ConnectedGallery";
import NotFound from "./components/NotFound";

// Component
const App: React.FC = () => (
    <Container fluid className="d-flex flex-column align-items-center">
        <Header />
        <Switch>
            <Redirect from="/" to="/photos/dogs" exact />
            <Route path="/photos/:tag" component={ConnectedGallery} />
            <Route component={NotFound} />
        </Switch>
    </Container>
);

// Export
export default hot(App);
