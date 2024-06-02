import {useLocation, useNavigate} from "react-router-dom";
import {FC, ReactNode, useEffect} from "react";
import {useTranslation} from "react-i18next";


interface AuthCheckProps {
    children: ReactNode;
}

export const CheckLogin: FC<AuthCheckProps> = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        const isLoginPage = location.pathname.includes('/admin/users/login');

        if (!jwt && !isLoginPage) {
            const currentLanguage = location.pathname.split('/')[1];
            navigate(`/${currentLanguage}/admin/users/login`);
        }
    }, [location, navigate]);
    return (
        <>{children}</>
    );
};
