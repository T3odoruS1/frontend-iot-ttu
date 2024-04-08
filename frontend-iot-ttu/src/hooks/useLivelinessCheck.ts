import {LivelinessService} from "../services/LivelinessService";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const useLivelinessCheck = () => {
    const service = new LivelinessService();
    const navigate = useNavigate();
    const {i18n} = useTranslation();
    const location = useLocation();
    useEffect(() => {
        if(!location.pathname.includes("error")){
            service.ping().then().catch(() => {
                navigate(`/${i18n.language}/error`)
            })
        }

    }, [location]);
}


export default useLivelinessCheck;