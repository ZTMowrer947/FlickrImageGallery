// Imports
import React from "react";
import MainNav from "./MainNav";
import SearchForm from "./SearchForm";

// Component
const Header: React.FC = () => (
    <header className="w-50 mx-auto my-5 d-flex flex-column align-items-center">
        <h1 className="text-center">Flickr Image Gallery</h1>

        <SearchForm />

        <MainNav />
    </header>
);

// Export
export default Header;
