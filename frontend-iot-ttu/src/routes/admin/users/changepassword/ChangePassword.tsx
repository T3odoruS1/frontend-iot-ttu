import * as yup from "yup";
import {IdentityService} from "../../../../services/IdentityService";
import {FieldValues, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import PageTitle from "../../../../components/common/PageTitle";
import {Form} from "react-bootstrap";
import {SuccessAlert} from "../../../../components/lottie/SuccessAlert";
import InputControl from "../../../../components/form/InputControl";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {useTranslation} from "react-i18next";

const schema = yup.object().shape({
    password: yup.string().required("common.requiredField"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], "common.passwordsMustMatch").required("common.requiredField"),
    oldPassword: yup.string().required("common.requiredField")
})

const ChangePassword = () => {
    const {t} = useTranslation();
    const service = new IdentityService();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);

    const {register, handleSubmit, formState: {errors}} =
        useForm({resolver: yupResolver(schema)});

    const onSubmit = (fieldValues: FieldValues) => {
        // const data = {password: fieldValues.password, oldPassword: fieldValues.oldPassword};
        // setPending(true)
        // service.changePassword(data).then(r => {
        //     setSuccess(true)
        //     setTimeout(() => {
        //         setSuccess(false)
        //         navigate("../..");
        //     }, 3000)
        // }).catch(e => {
        //     if(e.message == 500){
        //         setMessage("Service is currently unavailable. Try again later.")
        //     }else{
        //         setMessage("Wrong old password")
        //     }
        // }).finally(() => setPending(false));
    }

    return (
        <>
            <PageTitle>{t("common.changePassword")}</PageTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {success && <SuccessAlert/>}
                {message && <p className={"text-danger"}>{message}</p>}

                <div className={"mt-2"}>
                    <InputControl type={"text"} error={t(errors.oldPassword?.message)} register={register}
                                  name={'oldPassword'} label={"Old password"}/>
                </div>
                <div className={"mt-2"}>
                    <InputControl type={"text"} error={t(errors.password?.message)} register={register}
                                  name={'password'} label={"New password"}/>
                </div>
                <div className={"mt-2"}>
                    <InputControl type={"text"} error={t(errors.confirmPassword?.message)} register={register}
                                  name={'confirmPassword'} label={"Confirm new password"}/>
                </div>

                <ButtonPrimary
                    className="btn_custom_out mt-5 w-25 align-self-center" type={"button"}
                    onClick={handleSubmit(onSubmit)}>
                    {t("common.submit")}
                </ButtonPrimary>
            </Form>
        </>
    );
};

export default ChangePassword;