import {IdentityService} from "../../../services/IdentityService";
import useFetch from "../../../hooks/useFetch";
import {IRole} from "../../../dto/identity/IRole";
import {JwtContext} from "../../Root";
import {useContext} from "react";
import PageTitle from "../../../components/common/PageTitle";

// interface IRoute {
//     route: string,
//     title: string,
//     description: string
// }

const AdminLandingPage = () => {
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);

    const service = new IdentityService();
    const {data: roles, pending, error} = useFetch<IRole[]>(service.getRoles)


    return (
        <>
            <PageTitle>Admin panel</PageTitle>
            <div>
                <h5 className={""}>Logged in as: {jwtResponseCtx?.username}</h5>
                <h5 className={""}>With
                    role: {roles?.find(r => r.id === jwtResponseCtx?.roleIds?.at(0))?.name}</h5>
            </div>
        </>
    );
};

export default AdminLandingPage;