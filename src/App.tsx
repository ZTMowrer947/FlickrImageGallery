// Imports
import React from 'react';
import Container from 'react-bootstrap/Container';

import Header from './components/Header';

import './App.css';

// App component
const App: React.FC = () => {
    return (
        <Container fluid className="h-100">
            <Header />
        </Container>
    );
};

// Export
export default App;
