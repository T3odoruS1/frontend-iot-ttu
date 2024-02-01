import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import i18n from "i18next";
import {IdentityService} from "../../services/IdentityService";

export const NotAuthenticated = () => {
    const navigate = useNavigate();
    const identityService= new IdentityService();

    useEffect(() => {
        try{
            identityService.logout();
        }catch (e){

        }
        navigate(`/${i18n.language}/admin/users/login`)
    }, []);
    return (
        <></>
    );
};