// Imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// App rendering
function renderApp(): void {
    // Get container to mount react app on
    const container = document.getElementById("app");

    // If container was not found, throw error
    if (!container) throw new Error("Could not find container for React app");

    // Otherwise, mount react app
    ReactDOM.render(<App />, container);
}

// If DOM has not yet loaded,
if (document.readyState === "loading")
    // Render app when DOM is ready
    document.addEventListener("DOMContentLoaded", renderApp);
// Otherwise, render app immediately
else renderApp();
