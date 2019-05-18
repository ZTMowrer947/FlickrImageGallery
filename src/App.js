// Imports
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import apiKey from "./config";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import fetchPhotos from "./fetchPhotos";

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
                computers: [],
                dogs: [],
            },

            // Search results
            searchResults: [],

            // Any error that may occur
            error: null,

            // Whether or not we are currently loading something
            isLoading: true,
        };
    }

    componentDidMount() {
        // Get list of default tags
        const defaultTags = Object.keys(this.state.defaultPhotos);

        // Map tag to API request, combined into a single Promise
        Promise.all(defaultTags.map(tag => fetchPhotos(apiKey, tag)))
            // If all requests succeed,
            .then(photosByTag => {
                // Extract copy of default photo data from state
                const newDefaultPhotoData = { ...this.state.defaultPhotos };

                // Loop over data for each request
                photosByTag.forEach((photoData, index) => {
                    // Set photo data for tag
                    newDefaultPhotoData[defaultTags[index]] = photoData.photo;
                });

                // Update component state with default photo data
                this.setState({
                    defaultPhotos: newDefaultPhotoData,
                    isLoading: false,
                    error: null,
                });
            }).catch((error) => {
                // Update component state with error
                this.componentDidMount.setState({
                    isLoading: false,
                    error,
                });
            });
    }

    render() {
        // Get list of default tags
        const defaultTags = Object.keys(this.state.defaultPhotos);

        // Map tag to route
        const defaultRoutes = defaultTags.map((tag, index) => {
            return <Route key={index} path={`/${tag}`} exact={true} render={() => <Gallery photos={this.state.defaultPhotos[tag]} isLoading={this.state.isLoading} />} />
        });

        return (
            <div className="App container">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        {defaultRoutes}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
