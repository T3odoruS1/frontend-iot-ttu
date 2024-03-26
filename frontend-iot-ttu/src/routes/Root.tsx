import {createContext, useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import i18n from "i18next";
import {IJwtResponse} from "../dto/identity/IJwtResponse";
import ReactGA from "react-ga";

export const JwtContext = createContext<{
    jwtResponseCtx: IJwtResponse | null;
    setJwtResponseCtx: ((data: IJwtResponse | null) => void) | null;
}>({jwtResponseCtx: null, setJwtResponseCtx: null});


const Root = () => {
    const {lang} = useParams();
    const navigate = useNavigate();
    const langs = ["en", "et"];
    const location = useLocation();


    const [jwtResponseCtx, setJwtResponseCtx] = useState(
        null as IJwtResponse | null
    );

    useEffect(() => {
        const data = window.localStorage.getItem("jwt");
        if (data) {
            setJwtResponseCtx(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        ReactGA.pageview(location.pathname + location.search);
    }, [location]);


    useEffect(() => {
        function isSafari() {
            var ua = navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') !== -1 && !(ua.indexOf('chrome') > -1));
        }

        if (isSafari()) {
            document.body.classList.add('safari');
        }

        if (!langs.includes(lang!)) {
            navigate("/et")
        }
    }, [lang])
    return (
        <>
            <JwtContext.Provider value={{jwtResponseCtx, setJwtResponseCtx}}>
                <ScrollToTop/>
                <script
                    src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.bundle.min.js"></script>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
                <Outlet/>
            </JwtContext.Provider>

        </>
    );
};

export default Root;
