// Imports
import React from "react";

// Component
class SearchForm extends React.PureComponent {
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            // The current search term
            searchTerm: "",

            // The previous search term
            previousSearch: "",
        };
    }

    onInputChange(e) {
        // Update component state with new search term
        this.setState({ searchTerm: e.currentTarget.value });
    }

    onFormSubmit(e) {
        // Prevent default form submission behavior
        e.preventDefault();

        // If the current search term is different from the previous search term,
        if (this.state.searchTerm !== this.state.previousSearch) {
            // Update component state
            this.setState(prevState => ({
                searchTerm: "",
                previousSearch: prevState.searchTerm,
            }));
        }
    } 

    render() {
        return (
            <form className="search-form" onSubmit={this.onFormSubmit.bind(this)}>
                <input type="search" name="search" placeholder="Search" required onChange={this.onInputChange.bind(this)} value={this.state.searchTerm} />
                <button type="submit" className="search-button">
                <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                </button>
            </form>
        );
    }
}

// Export
export default SearchForm;
