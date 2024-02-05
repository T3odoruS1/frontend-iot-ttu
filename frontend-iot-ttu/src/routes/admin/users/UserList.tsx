import {IdentityService} from "../../../services/IdentityService";
import useUsers from "../../../hooks/useUsers";
import PageTitle from "../../../components/common/PageTitle";
import {Loader} from "../../../components/Loader";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import ActionConfirmationAlert from "../../../components/common/ActionConfirmationAlert";
import {Table} from "react-bootstrap";
import {UserRolePopup} from "./UserRolePopup";
import useRoles from "../../../hooks/useRoles";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {JwtContext} from "../../Root";

export const UserList = () => {
    const {users, pending, error, fetch} = useUsers()
    const {roles} = useRoles();
    const identityService = new IdentityService();
    const navigate = useNavigate();
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);

    const deactivateUser = (id: string) => {
        identityService.deactivateUser({userId: id}).then(r => {
            if(r === undefined){
                navigate("./login");
            }else{
                fetch();
            }
        })
    }



    if(!jwtResponseCtx?.jwt || jwtResponseCtx.roleIds.length === 0){
        navigate("/login");
    }

    return (
        <>
        <PageTitle>User management</PageTitle>
            {pending && <Loader/>}

            <Table variant="striped">
                <caption>Users</caption>
                {/*{pending && <div className={"m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User name</th>
                    <th scope="col">Email</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Lock</th>
                    <th scope="col">Actions</th>

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
                                <td>{user.lockoutEnabled.toString()}</td>
                                <td>
                                    {}
                                    <UserRolePopup user={user} roles={roles ?? []} email={user.email} fetch={fetch}/>
                                    <ActionConfirmationAlert action={() => {
                                            deactivateUser(user.id);
                                    }} displayText={"Are you sure you want to delete this news piece?"}
                                                             buttonText={"Delete"}/>
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