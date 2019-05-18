// Imports
import React from "react";
import PropTypes from "prop-types";
import Nav from "./Nav";
import SearchForm from "./SearchForm";

// Component
const Header = ({ onFormSearch }) => (
    <header>
        <h1>Flickr Image Gallery</h1>

        <SearchForm onSearch={onFormSearch} />

        <Nav />
    </header>
);

// Prop Types
Header.propTypes = {
    onFormSearch: PropTypes.func.isRequired,
}

// Export
export default Header;
