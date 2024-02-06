import {useContext} from "react";
import {JwtContext} from "../routes/Root";
import ButtonSmaller from "./common/ButtonSmaller";
import {IdentityService} from "../services/IdentityService";
import useFetch from "../hooks/useFetch";
import {IRole} from "../dto/identity/IRole";

const Footer = () => {

    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);
    const identityService = new IdentityService();
    const {data: roles, error} = useFetch<IRole[]>(identityService.getRoles);

    const logout = () => {
        identityService.logout().then(() => {
            setJwtResponseCtx!(null);
        });
    }

    return (
        <>

            <footer className="footer d-flex top-gradient">

                <div className="text-light m-5"><b>© 2023 TalTech Embedded AI Research Lab.</b></div>
                {jwtResponseCtx?.jwt &&
                    <div className={"m-5"}>
                        <h5 className={"text-white"}>Logged in as: {jwtResponseCtx.username}</h5>
                        <h5 className={"text-white"}>With role: {roles?.find(r => r.id === jwtResponseCtx?.roleIds?.at(0))?.name}</h5>
                        <ButtonSmaller onClick={logout}>Logout</ButtonSmaller>
                    </div>
                }
            </footer>

        </>
    );
};

export default Footer;
