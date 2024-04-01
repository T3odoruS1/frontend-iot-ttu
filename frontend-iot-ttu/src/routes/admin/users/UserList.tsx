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
import addUser from "../../../assets/iconpack/addUser.svg"
import removeUser from "../../../assets/iconpack/removeUser.svg";
import {use} from "i18next";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
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
        return jwtResponseCtx?.roleIds.at(0) !== roles?.find(r => r.name === "MODERATOR")?.id;

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

    return (
        <>
            <div className={"d-flex"}>
                <SubHeadingPurple className={"mt-2"}>{t("user.listTitle")}</SubHeadingPurple>
                <Show>
                    <Show.When isTrue={canUseActions()}>
                        <img onClick={toBlindRegister} className={"icon-wrapper-sm m-2"} alt={"View"} src={addUser}/>

                    </Show.When>
                </Show>
            </div>
            <Show>
                <Show.When isTrue={pending}><Loader/></Show.When>
            </Show>

            <Table responsive={"xl"} variant="striped">
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
                                <td width={150}  className={""}>

                                    <div className={"d-flex"}>
                                        <div>{user.roles.at(0)?.name} {user.roles.at(0)?.name?.length === 5 ?
                                            <span></span> : ""}</div>

                                        <div className={"mx-2"}>{
                                            <Show>
                                                <Show.When isTrue={canUseActions()}>
                                                    <div
                                                        className={user.roles.at(0)?.name?.length === 5 ? " ms-5" : "ps-1"}>
                                                        <UserRolePopup user={user} roles={roles ?? []}
                                                                       email={user.email} fetch={fetch}/>
                                                    </div>


                                                </Show.When>
                                            </Show>

                                        }</div>
                                    </div>
                                </td>
                                <td width={200}>
                                    <div className={"d-flex"} style={{width: 200}}>

                                        {canUseActions() && <>

                                            <ActionConfirmationAlert action={() => {
                                                deactivateUser(user.id)
                                            }} displayText={t("common.deleteUSure")}
                                                                     triggerElement={
                                                                         <div className={"icon-wrapper"}>
                                                                             <img
                                                                                 className={"icon"} alt={"Delete"}
                                                                                 src={removeUser}/>
                                                                         </div>}/>
                                            <ActionConfirmationAlert action={() => {
                                                deactivateUser(user.id)
                                            }} displayText={t("common.deleteUSure")}
                                                                     triggerElement={
                                                                         <ButtonSmaller className={"ms-2"}>Reset
                                                                             password</ButtonSmaller>}/>
                                        </> || <div>{t("user.noRights")}</div>}

                                    </div>
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