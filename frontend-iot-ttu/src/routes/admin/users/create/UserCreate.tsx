import {FieldValues} from "react-hook-form";
import {UserCreateForm} from "./UserCreateForm";
import {IdentityService} from "../../../../services/IdentityService";
import {IRegister} from "../../../../dto/identity/IRegister";
import {useState} from "react";

const UserCreate = () => {

    const identityService = new IdentityService();
    const [error, setError] = useState<string>("")

    const handleSubit = async (data: FieldValues) => {
        console.log(data)
        identityService.register(data as IRegister)
            .then(response => {
                if (!response.jwt) {
                    console.log("No jwt in response")
                }
            })
            .catch((e) => {
                console.log(e)
                setError(e.message)
            })
    }

    return <UserCreateForm error={error} onSubmit={handleSubit}/>
}

export default UserCreate;