// Imports
import React from "react";
import { Link } from "react-router-dom";

// Component
const NotFound = () => (
    <div className="not-found">
        <h3>Route Not Found</h3>
        <p>The current route does not exist.</p>
        <Link to="/">Return to home page</Link>
    </div>
);

// Export
export default NotFound;
