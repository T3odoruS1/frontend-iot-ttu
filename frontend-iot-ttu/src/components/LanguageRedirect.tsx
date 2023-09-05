import { useEffect } from 'react';
import i18n from "i18next";
import { useNavigate } from 'react-router-dom';

const LanguageRedirect = () => {
    const navigate = useNavigate();
    const language = i18n.language;  // default to 'en' if no language is detected

    useEffect(() => {
        setTimeout(() => {
            navigate(`/${i18n.language}`);
        },30);
        
    }, [language, navigate]);

    return null;  // render nothing
}

export default LanguageRedirect;
