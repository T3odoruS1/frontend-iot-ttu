import {FieldValues, useForm} from "react-hook-form";
import * as yup from "yup";
import PageTitle from "../../../../components/common/PageTitle";
import {IRegister} from "../../../../dto/identity/IRegister";
import {yupResolver} from "@hookform/resolvers/yup";
import {ILogin} from "../../../../dto/identity/ILogin";
import InputControl from "../../../../components/form/InputControl";
import React from "react";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";

interface IProps {
    error: string | null;
    onSubmit: (event: FieldValues) => void;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})


export const LoginForm = (props: IProps) => {

    const {register, handleSubmit, formState: {errors}} =
        useForm<ILogin>({resolver: yupResolver(schema)});
    return (
        <>
        <PageTitle>Login</PageTitle>
            {props.error && <p className={"text-danger"}>{props.error}</p>}
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
                        type="text"
                        error={errors.password?.message}
                        label={"Password"}
                    />
                </div>


                <ButtonPrimary className="mt-2" type="submit">
                    Login
                </ButtonPrimary>
            </form>
        </>
    );
};