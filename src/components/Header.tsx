// Imports
import React from "react";
import MainNav from "./MainNav";

// Component
const Header: React.FC = () => (
    <header className="w-50 mx-auto my-5">
        <h1 className="text-center">Flickr Image Gallery</h1>

        <MainNav />
    </header>
);

// Export
export default Header;
