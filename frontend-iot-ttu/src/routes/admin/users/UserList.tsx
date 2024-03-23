import {IdentityService} from "../../../services/IdentityService";
import PageTitle from "../../../components/common/PageTitle";
import {Loader} from "../../../components/Loader";
import ActionConfirmationAlert from "../../../components/common/ActionConfirmationAlert";
import {Table} from "react-bootstrap";
import {UserRolePopup} from "./UserRolePopup";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {JwtContext} from "../../Root";
import useFetch from "../../../hooks/useFetch";
import {IRole} from "../../../dto/identity/IRole";
import {useTranslation} from "react-i18next";
import {IUser} from "../../../dto/identity/IUser";
import Show from "../../../components/common/Show";
import ButtonSmaller from "../../../components/common/ButtonSmaller";

const UserList = () => {
    const navigate = useNavigate();
    const identityService = new IdentityService();
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);

    const {data: users, pending, error, fetchData: fetch} =
        useFetch<IUser[]>(identityService.getUsers, [])

    const {data: roles} = useFetch<IRole[]>(identityService.getRoles);

    const canUseActions = (): boolean => {
        if (jwtResponseCtx?.roleIds.length === 0) {
            return false;
        }
        return jwtResponseCtx?.roleIds.at(0) !== roles?.find(r => r.name === "USER")?.id;

    }

    const deactivateUser = (id: string) => {

        identityService.deactivateUser({userId: id}).then(r => {
            if (r === undefined) {
                navigate("./login");
            } else {
                fetch();
            }
        })
    }


    const {t} = useTranslation();

    const toBlindRegister = () => {
        navigate("./create")
    }

    // // TODO enable for production
    // if(!jwtResponseCtx?.jwt || jwtResponseCtx.roleIds.length === 0){
    //     return <NotAuthenticated/>
    // }

    return (
        <>
            <PageTitle>{t("user.listTitle")}</PageTitle>
            <Show>
                <Show.When isTrue={pending}><Loader/></Show.When>
            </Show>
            <Show>
                <Show.When isTrue={canUseActions()}>
                    <ButtonSmaller onClick={toBlindRegister}>Create user</ButtonSmaller>
                </Show.When>
            </Show>
            <Table variant="striped">
                <caption>{t("user.users")}</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("user.username")}</th>
                    <th scope="col">{t("user.email")}</th>
                    <th scope="col">{t("user.firstname")}</th>
                    <th scope="col">{t("user.lastname")}</th>
                    <th scope="col">{t("user.role")}</th>
                    <th scope="col">{t("common.actions")}</th>

                </tr>
                </thead>
                <tbody>
                {users?.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.roles.at(0)?.name}</td>
                                <td>
                                    {canUseActions() && <>
                                        <UserRolePopup user={user} roles={roles ?? []} email={user.email} fetch={fetch}/>
                                        <ActionConfirmationAlert action={() => {
                                            deactivateUser(user.id);
                                        }} displayText={t("common.deleteUSure")}
                                                                 buttonText={t("common.delete")}/>
                                    </> || <p>{t("user.noRights")}</p>}

                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
        </>
    );
};


export default UserList;