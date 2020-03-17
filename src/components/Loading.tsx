// Imports
import React, { useState, useEffect } from 'react';

// Prop Types
interface PropTypes {
    delay?: number;
}

// Component
const Loading: React.FC<PropTypes> = ({ delay }) => {
    // Initialize state
    const [isDelaying, setIsDelaying] = useState(() => delay! > 0);

    // Delay display of loading indicator if delay is set
    useEffect(() => {
        let timeoutId: number;

        // If we are delaying,
        if (isDelaying) {
            // Set timeout for delay
            timeoutId = window.setTimeout(() => {
                // When delay expires, show spinner
                setIsDelaying(false);
            });
        }

        // On cleanup,
        return () => {
            // Clear timeout
            window.clearTimeout(timeoutId);
        };
    }, [isDelaying]);

    // If we are not delaying,
    if (!isDelaying) {
        // Render a spinner
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    // Otherwise, render nothing
    return null;
};

// Default props
Loading.defaultProps = {
    delay: 0,
};

// Export
export default Loading;
