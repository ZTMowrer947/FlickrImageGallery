// Imports
import React from "react";
import PropTypes from "prop-types";
import Nav from "./Nav";
import SearchForm from "./SearchForm";

// Component
const Header = ({ defaultTags, onFormSearch }) => (
    <header>
        <h1>Flickr Image Gallery</h1>

        <SearchForm defaultTags={defaultTags} onSearch={onFormSearch} />

        <Nav />
    </header>
);

// Prop Types
Header.propTypes = {
    onFormSearch: PropTypes.func.isRequired,
    defaultTags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

// Export
export default Header;
