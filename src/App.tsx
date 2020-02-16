// Imports
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import GalleryPage from './pages/GalleryPage';

import './App.css';

// App component
const App: React.FC = () => {
    return (
        <Container
            fluid
            className="h-100 d-flex flex-column align-items-center"
        >
            <Header />
            <Switch>
                <Redirect from="/" to="/tagged/dogs" exact />
                <Route
                    path="/tagged/:tag"
                    render={routeProps => <GalleryPage {...routeProps} />}
                />
            </Switch>
        </Container>
    );
};

// Export
export default App;
