import {Link, useLocation} from "react-router-dom";

interface IProps {
    title: string;
    to: string;
}

const HeaderNavLink = (props: IProps) => {

    const location = useLocation();

    const elementIsActive = (path: string) => {

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

        <li key={Math.random()} className="nav-item header-item">
            <Link  className={elementIsActive(props.to) ? "nav-link top-text top-text-active" : "nav-link top-text" } aria-current="page" to={props.to}>
                {props.title}
            </Link>
        </li>

    );
};

export default HeaderNavLink;
