// Imports
import React from 'react';
import './App.css';
import Header from "./components/Header";

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
        return (
            <div className="App container">
                <Header />
            </div>
        );
    }
}

export default App;
