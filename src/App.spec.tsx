// Imports
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import App from './App';
import store from './store';

// Test Suite
describe('App component', () => {
    it('should render without errors', () => {
        // Render app inside StaticRouter and Redux provider
        render(
            <Provider store={store}>
                <StaticRouter location="/">
                    <App />
                </StaticRouter>
            </Provider>
        );
    });
});
