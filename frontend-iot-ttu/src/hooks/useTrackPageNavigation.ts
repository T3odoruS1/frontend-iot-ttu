import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from "react-ga4";

const useTrackPageNavigation = () => {
    const location = useLocation();
    const [previousPath, setPreviousPath] = useState('');

    useEffect(() => {
        const currentPath = location.pathname;

        if (previousPath && currentPath !== previousPath) {
            // Send the navigation event to GA4
            ReactGA.event({
                category: "Navigation",
                action: `${previousPath} -> ${currentPath}`,
                label: `${previousPath} -> ${currentPath}`
            });
        }

        // Update the previousPath for the next navigation event
        setPreviousPath(currentPath);
    }, [location]);
};

export default useTrackPageNavigation;