import {FieldValues, useForm} from "react-hook-form";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import {IRegister} from "../../../../dto/identity/IRegister";
import PageTitle from "../../../../components/common/PageTitle";
import InputControl from "../../../../components/form/InputControl";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import React from "react";
import {FormFloating, FormSelect} from "react-bootstrap";
import {IdentityService} from "../../../../services/IdentityService";
import useFetch from "../../../../hooks/useFetch";
import {IRole} from "../../../../dto/identity/IRole";


interface IProps {
    onSubmit: (event: FieldValues) => void;
    error?: string;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    userName: yup.string().required(),
    roleId: yup.string().uuid().required()
})

export const UserCreateForm = (props: IProps) => {
    const {t} = useTranslation();

    const identityService = new IdentityService();
    const {data: roles, pending, error} = useFetch<IRole[]>(identityService.getAllRoles)

    const {register, handleSubmit, formState: {errors}} =
        useForm<IRegister>({resolver: yupResolver(schema)});


    return (
        <>
            <PageTitle>Create new moderator/admin</PageTitle>
            <p>Input all user data. Email will be sent to specified address and new user will finish registration</p>
            <p className={"text-danger"}>{props.error}</p>
            <form onSubmit={
                handleSubmit((dto) => {
                    props.onSubmit(dto)
                })}>

                <div className={"mt-2"}>
                    <InputControl
                        name={`email`}
                        register={register}
                        type="text"
                        error={errors.email?.message}
                        label={"E-mail"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`password`}
                        register={register}
                        type="password"
                        error={errors.password?.message}
                        label={"Password"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`firstName`}
                        register={register}
                        type="text"
                        error={errors.firstName?.message}
                        label={"First name"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`lastName`}
                        register={register}
                        type="text"
                        error={errors.lastName?.message}
                        label={"Last name"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`userName`}
                        register={register}
                        type="text"
                        error={errors.userName?.message}
                        label={"User name"}
                    />
                </div>

                <div className={"mt-2"}>
                    <FormFloating>
                        <FormSelect
                            aria-label={"Chose admin role"}
                            {...register("roleId")}
                            id={"roleId"}
                            name={"roleId"}
                        >
                            <option value={""}>Choose role</option>
                            {roles?.map(r => {
                                return <option value={r.id}>{r.name}</option>
                            })}
                        </FormSelect>
                    </FormFloating>
                </div>


                <ButtonPrimary className="mt-2" type="submit">
                    {t("admin.news.adminNews.create.create")}
                </ButtonPrimary>
            </form>
        </>
    );
};