import React, {useContext} from "react";
import {JwtContext} from "../routes/Root";
import ButtonSmaller from "./common/ButtonSmaller";
import {IdentityService} from "../services/IdentityService";
import useFetch from "../hooks/useFetch";
import {IRole} from "../dto/identity/IRole";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import HeaderNavLink from "./header/HeaderNavLink";
import {useNavigate} from "react-router-dom";

const Footer = () => {

    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);
    const {t} = useTranslation();
    if (jwtResponseCtx?.jwt) {
        return (
            <footer className="footer d-flex top-gradient">
                <div className="text-light m-5"><b>© 2023 TalTech Embedded AI Research Lab.</b></div>
                <UserData/>
                <div className={"m-2 d-flex justify-content-center align-items-center"}>
                    <HeaderNavLink
                    to={`/${i18n.language}/admin/news`}
                    title={t("admin.header.admin")}
                />
                </div>

            </footer>
        );
    } else {
        return <footer className="footer d-flex top-gradient">
            <div className="text-light m-5"><b>© 2023 TalTech Embedded AI Research Lab.</b></div>
            <div className={"m-2 w-100 pl-auto d-flex justify-content-center align-items-center"}>
                <HeaderNavLink
                    to={`/${i18n.language}/admin/news`}
                    title={t("admin.header.admin")}
                />
            </div>
        </footer>
    }


};

export default Footer;


const UserData = () => {
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);
    const identityService = new IdentityService();
    const {data: roles, error} = useFetch<IRole[]>(identityService.getRoles);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const logout = () => {
        identityService.logout().then(() => {
            setJwtResponseCtx!(null);
            navigate(`/${i18n.language}/`)
        });
    }

    return <div className={"m-5"}>
        <h5 className={"text-white"}>{t('common.loggedInAs')} {jwtResponseCtx!.username}</h5>
        <h5 className={"text-white"}>{t('common.withRole')} {roles?.find(r => r.id === jwtResponseCtx?.roleIds?.at(0))?.name}</h5>
        <ButtonSmaller onClick={logout}>{t('user.logout')}</ButtonSmaller>
    </div>

}