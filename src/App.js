// Imports
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import apiKey from "./config";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import NotFound from './components/NotFound';
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
        
        // Get the current path
        const path = document.location.pathname;

        // If the path indicates a search location,
        if (path.startsWith("/search")) {
            // Get the index of the last slash
            const slashIndex = path.lastIndexOf("/");

            // Get tag from path
            const tag = path.substring(slashIndex + 1);

            // If tag is a default tag,
            if (defaultTags.includes(tag)) {
                // Redirect to default tag
                document.location.pathname = `/${tag}`;
            }

            // Search with tag
            this.handleSearch(tag);
        }

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
                this.setState({
                    isLoading: false,
                    error,
                });
            });
    }

    handleSearch(searchTerm) {
        // Set state to signal that we are loading new data
        this.setState({
            isLoading: true,
            searchResults: [],
        });

        // Search for photos with the given tag
        fetchPhotos(apiKey, searchTerm)
            // If the request suceeded,
            .then(photos => {
                // Store the new data in state
                this.setState({
                    isLoading: false,
                    error: null,
                    searchResults: photos.photo,
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
            return <Route key={index} path={`/${tag}`} exact={true} render={() => <Gallery photos={this.state.defaultPhotos[tag]} isLoading={this.state.isLoading} tag={tag} />} />
        });

        return (
            <div className="App container">
                <BrowserRouter>
                    <Header defaultTags={defaultTags} onFormSearch={this.handleSearch.bind(this)} />
                    <Switch>
                        {/* Redirect to cats default route */}
                        <Redirect from="/" exact={true} to="/cats" />

                        {/* Include list of default tag routes */}
                        {defaultRoutes}

                        {/* Search result route */}
                        <Route path="/search/:tag" render={({ match }) => <Gallery photos={this.state.searchResults} isLoading={this.state.isLoading} tag={match.params.tag} />} />
                        
                        {/* Catch-all 404 Route */}
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
