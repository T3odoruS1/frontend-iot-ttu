import {Link, useLocation} from "react-router-dom";

interface IProps {
    title: string;
    to: string;
    selected?: boolean;
}

const HeaderNavLink = (props: IProps) => {

    const location = useLocation();

    const elementIsActive = (path: string) => {

        if(props.selected !== undefined){
            return props.selected;
        }

        if(path === "/en" || path === "/et"){
            return location.pathname === "/en" || location.pathname === "/et"
        }
        // Normalize the paths to remove trailing slashes
        const normalizedPath = path.replace(/\/$/, "");
        const normalizedLocationPath = location.pathname.replace(/\/$/, "");

        // Determine if the current path is the home page by checking the segment count
        const locationSegments = normalizedLocationPath.split('/');
        const isHomePage = locationSegments.length === 3 && locationSegments[2] === ""; // e.g., /en/ becomes ['', 'en', '']

        // Special handling for the home page
        if (isHomePage) {
            return normalizedPath === normalizedLocationPath;
        }

        // For other paths, check if the current location starts with the provided path
        // and ensure proper segmentation to avoid false positives
        return normalizedLocationPath.startsWith(normalizedPath) &&
            (normalizedLocationPath[normalizedPath.length] === '/' || normalizedLocationPath.length === normalizedPath.length);
    };

    return (

            <Link  className={elementIsActive(props.to) ? "nav-link top-text top-text-active nav-item header-item" :
                "nav-link top-text nav-item header-item" } aria-current="page" to={props.to}>
                {props.title}
            </Link>

    );
};

export default HeaderNavLink;
