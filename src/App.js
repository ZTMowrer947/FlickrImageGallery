// Imports
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Gallery from "./components/Gallery";

// Component
class App extends React.Component {
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            // Photos for default tags
            defaultPhotos: {
                cats: [],
                dogs: [],
                computers: [],
            },

            // Search results
            searchResults: [],

            // Any error that may occur
            error: null,

            // Whether or not we are currently loading something
            isLoading: true,
        };
    }

    render() {
        // Get list of default tags
        const defaultTags = Object.keys(this.state.defaultPhotos);

        // Map tag to route
        const defaultRoutes = defaultTags.map((tag, index) => {
            return <Route key={index} path={`/${tag}`} exact={true} render={() => <Gallery photos={this.state.defaultPhotos[tag]} />} />
        });

        return (
            <div className="App container">
                <Header />

                <BrowserRouter>
                    <Switch>
                        {defaultRoutes}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
