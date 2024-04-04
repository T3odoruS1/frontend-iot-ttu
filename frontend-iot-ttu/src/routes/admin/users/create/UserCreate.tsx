import {FieldValues} from "react-hook-form";
import {UserCreateForm} from "./UserCreateForm";
import {IdentityService} from "../../../../services/IdentityService";
import {IRegister} from "../../../../dto/identity/IRegister";
import {useContext, useState} from "react";
import {JwtContext} from "../../../Root";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import LayoutNoHeader from "../../../../components/structure/LayoutNoHeader";

const UserCreate = () => {

    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);
    const identityService = new IdentityService();
    const [error, setError] = useState<string>("")
    const navigate = useNavigate();
    const {i18n} = useTranslation()

    const handleSubmit = async (data: FieldValues) => {
        console.log(data)
        identityService.blindRegister(data as IRegister, i18n.language)
            .then(response => {
                // if (!response.jwt) {
                //     console.log("No jwt in response")
                // }else{
                //     setJwtResponseCtx!(response);
                //     navigate("../..")
                // }
                navigate("../..");
            })
            .catch((e) => {
                console.log(e)
                setError(e.message)
            })
    }

    return <LayoutNoHeader bodyContent={<UserCreateForm error={error} onSubmit={handleSubmit}/>}/>
}

export default UserCreate;