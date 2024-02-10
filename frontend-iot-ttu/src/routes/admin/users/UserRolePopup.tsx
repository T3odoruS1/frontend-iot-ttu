import Popup from "../../../components/Popup";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import {IRole} from "../../../dto/identity/IRole";
import {IdentityService} from "../../../services/IdentityService";
import {FieldValues, useForm} from "react-hook-form";
import {IRoleUpdate} from "../../../dto/identity/IRoleUdate";
import {FormFloating, FormSelect} from "react-bootstrap";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect, useState} from "react";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {useTranslation} from "react-i18next";
import {IUser} from "../../../dto/identity/IUser";

interface IProps {
    email: string;
    user: IUser
    roles: IRole[]
    fetch: () => {}
}

const schema = yup.object().shape({
    roleId: yup.string().required()
})

export const UserRolePopup = (props: IProps) => {

    const {t} = useTranslation();

    const [message, setMessage] = useState("");

    const onSubmit = (fieldValues: FieldValues) => {
        let data = fieldValues as IRoleUpdate;
        console.log(data)
        data.userId = props.user.id;
        identityService.updateUserRole(fieldValues as IRoleUpdate)
            .then(res => {
                if (res !== undefined) {
                    props.fetch()
                    setMessage("Role changed successfully")
                } else {
                    setMessage("Your role does not permit other users role changes")
                }
            }).catch(e => setMessage("Service unavailable"))
    }

    const identityService = new IdentityService();
    const {register, handleSubmit, setValue, formState: {errors}} =
        useForm<{ roleId: string }>({resolver: yupResolver(schema)});

    useEffect(() => {
        if(props.user.roles.at(0)?.id !== undefined){
            setValue("roleId", props.user.roles.at(0)!.id)
        }
    }, [props.user.roles]);

    return (
        <Popup content={
            <div className={"p-5"}>
                <SubHeadingPurple>
                    {t("user.changeRoleFor", {user: props.email})}
                </SubHeadingPurple>
                <form onSubmit={handleSubmit((dto) => {
                    onSubmit(dto);
                })}>
                    <p>{message ?? errors.roleId?.message}</p>
                    <FormFloating>
                        <FormSelect {...register("roleId")} id={`roleId`}
                                    aria-label={"Chose user role"} name={"roleId"}>
                            {props.roles.map(r => {
                                return <option value={r.id}>{r.name}</option>
                            })}
                        </FormSelect>
                        <ButtonPrimary className="mt-2" type="submit">
                            {t("admin.news.adminNews.create.create")}
                        </ButtonPrimary>
                    </FormFloating>
                </form>
            </div>
        } trigger={
            <ButtonSmaller className="mb-2">{t("user.changeRole")}</ButtonSmaller>
        }></Popup>
    );
};