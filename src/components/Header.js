// Imports
import React from "react";
import Nav from "./Nav";
import SearchForm from "./SearchForm";

// Component
const Header = () => (
    <header>
        <h1>Flickr Image Gallery</h1>

        <SearchForm />

        <Nav />
    </header>
);

// Export
export default Header;
