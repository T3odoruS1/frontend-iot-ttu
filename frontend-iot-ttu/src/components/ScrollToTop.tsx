import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // @ts-ignore
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}

export default ScrollToTop;