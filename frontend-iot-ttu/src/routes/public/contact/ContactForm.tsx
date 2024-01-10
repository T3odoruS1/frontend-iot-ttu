import {FormControl, FormFloating, FormLabel} from "react-bootstrap";
import * as yup from "yup";
import {MailService} from "../../../services/MailService";
import {FieldValues, useForm} from "react-hook-form";
import {IContactDto} from "../../../dto/contact/IContactDto";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import InputControl from "../../../components/form/InputControl";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import React, {useState} from "react";
import {IErrorResponse} from "../../../dto/IErrorResponse";


const schema = yup.object().shape({
    email: yup.string().email("public.contact.validEmail").required("admin.news.adminNews.create.validation.fieldIsRequired"),
    firstName: yup.string().required("admin.news.adminNews.create.validation.fieldIsRequired"),
    lastName: yup.string().required("admin.news.adminNews.create.validation.fieldIsRequired"),
    phone: yup.string().optional(),
    messageText: yup.string().required("admin.news.adminNews.create.validation.fieldIsRequired")
})

const ContactForm = () => {

    const mailService = new MailService();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [message, setMessage] = useState("")

    const onSubmit = (fieldValues: FieldValues) => {
        mailService.contact(fieldValues as IContactDto).then((response) => {
            console.log(response)
        })
    }

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IContactDto>({
        resolver: yupResolver(schema)
    })


    return (


        <form onSubmit={handleSubmit((dto) => {
            onSubmit(dto);
        })}>
            <p>{message}</p>
            <SubHeadingPurple>{t("public.contact.yourInfo")}</SubHeadingPurple>
            <div className="mt-2">
                <InputControl
                    name={"email"}
                    register={register}
                    type={"text"}
                    markAsMandatory={true}
                    error={t(errors.email?.message?.toString())}
                    label={t("public.contact.form.email")}
                />
            </div>

            <div className="mt-2">
                <InputControl
                    name={"firstName"}
                    register={register}
                    type={"text"}
                    markAsMandatory={true}
                    error={t(errors.firstName?.message?.toString())}
                    label={t("public.contact.form.firstName")}
                />
            </div>
            <div className="mt-2">
                <InputControl
                    name={"lastName"}
                    register={register}
                    type={"text"}
                    markAsMandatory={true}
                    error={t(errors.lastName?.message?.toString())}
                    label={t("public.contact.form.lastName")}
                />
            </div>

            <div className="mt-2">
                <InputControl
                    name={"phone"}
                    register={register}
                    type={"text"}
                    error={t(errors.phone?.message?.toString())}
                    label={t("public.contact.form.phone")}
                />
            </div>
            <br/>
            <SubHeadingPurple>{t("public.contact.yourMessage")}</SubHeadingPurple>
            <div className="mt-2">
                {errors.messageText?.message && (
                    <span className="text-danger">{t(errors.messageText?.message.toString())}</span>)}
                <span className="text-danger"> *</span>
                <textarea
                    {...register("messageText")}
                    name={"messageText"}
                    style={{borderRadius: "0px"}}
                    className={"form-control"}
                    rows={5}
                />
            </div>

            <p>{message}</p>
            <ButtonPrimary className="mt-2" type="submit">
                {t("public.contact.form.submit")}
            </ButtonPrimary>
        </form>


    );
};

export default ContactForm;
