import {IdentityService} from "../../../services/IdentityService";
import PageTitle from "../../../components/common/PageTitle";
import {Loader} from "../../../components/Loader";
import ActionConfirmationAlert from "../../../components/common/ActionConfirmationAlert";
import {Table} from "react-bootstrap";
import {UserRolePopup} from "./UserRolePopup";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
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
import LayoutNoHeader from "../../../components/structure/LayoutNoHeader";


const UserList = () => {
    const navigate = useNavigate();
    const identityService = new IdentityService();
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);

    const {data: users, pending, error, fetchData: fetch} =
        useFetch<IUser[]>(identityService.getUsers, [])

    const [message, setMessage] = useState("");

    const {data: roles} = useFetch<IRole[]>(identityService.getRoles);

    const canUseActionsOnUser = (id: string): boolean => {
        if (jwtResponseCtx?.roleIds.length === 0 || jwtResponseCtx?.appUserId === id) {
            return false;
        }
        return jwtResponseCtx?.roleIds.at(0) !== roles?.find(r => r.name === "MODERATOR")?.id;
    }

    const canCreateUser = () => {
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
                setMessage("user.userDeleted")
                setTimeout(() => {
                    setMessage("");
                }, 5000);
                fetch();
            }
        }).catch(e => alert(e))
    }

    const toChangePassword = () => {
        navigate("./changepassword");
    }


    const {t} = useTranslation();

    const toBlindRegister = () => {
        navigate("./create")
    }


    const restPassword = (id: string) => {
        identityService.resetPassword({userId: id})
            .then(() => {
                setMessage("user.operationSuccessful")
                setTimeout(() => {
                    setMessage("");
                }, 5000);
            }).catch(() => {
            alert("Oops... something went wrong")
        })
    }

    return (<LayoutNoHeader bodyContent={<>
            <div className={"d-flex"}>
                <SubHeadingPurple className={"mt-2"}>{t("user.listTitle")}</SubHeadingPurple>
                <Show>
                    <Show.When isTrue={canCreateUser()}>
                        <img onClick={toBlindRegister} className={"icon-wrapper-sm m-2"} alt={"View"} src={addUser}/>

                    </Show.When>
                </Show>
            </div>
            <Show>
                <Show.When isTrue={pending}><Loader/></Show.When>
            </Show>

            <div className={"text-success"}>{t(message)}</div>
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
                                <td>
                                    <div className={"d-flex"}>
                                        <div>{user.roles.at(0)?.name}</div>

                                        <div className={"mx-2"}>{
                                            <Show>
                                                <Show.When isTrue={canUseActionsOnUser(user.id)}>
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
                                <td>
                                    <div className={"d-flex"} style={{width: 200}}>

                                        {canUseActionsOnUser(user.id) && <>

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
                                                restPassword(user.id)
                                            }} displayText={t("user.resetPasswordUSure")}
                                                                     triggerElement={
                                                                         <div
                                                                             className={"ms-4 link-arrow clickable-pointer"}>
                                                                             {t("user.resetPassword")}
                                                                         </div>}/>
                                        </> || <div>{t("user.noRights")}</div>}

                                    </div>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
            <div onClick={toChangePassword} className={"link-arrow clickable-pointer"}>
                {t("user.changeMyPass")}
            </div>
            <a target={"_blank"}
                className={"link-arrow link-no-underline fw-lighter"}
               href={"https://analytics.google.com/analytics/web/#/p433902250/reports/reportinghub?params=_u..nav%3Dmaui"}>
                {t("common.analyticsDashboard")}
            </a>
        </>}/>
    );
};


export default UserList;