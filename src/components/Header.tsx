// Imports
import React from "react";
import MainNav from "./MainNav";

// Component
const Header: React.FC = () => (
    <header className="w-50 mx-auto">
        <h1 className="text-center mt-5">Flickr Image Gallery</h1>

        <MainNav />
    </header>
);

// Export
export default Header;
