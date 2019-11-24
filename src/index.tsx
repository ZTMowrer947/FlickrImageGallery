// Imports
import "react-hot-loader";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/scss/bootstrap.scss";

import App from "./App";
import configureStore, { history } from "./store";

// App rendering
function renderApp(): void {
    // Get container to mount react app on
    const container = document.getElementById("app");

    // If container was not found, throw error
    if (!container) throw new Error("Could not find container for React app");

    // Create Redux store
    const store = configureStore();

    // Otherwise, mount react app
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        container
    );
}

// If DOM has not yet loaded,
if (document.readyState === "loading")
    // Render app when DOM is ready
    document.addEventListener("DOMContentLoaded", renderApp);
// Otherwise, render app immediately
else renderApp();
