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
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().optional(),
    messageText: yup.string().required()
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
            <SubHeadingPurple>Your info</SubHeadingPurple>
            <div className="mt-2">
                <InputControl
                    name={"email"}
                    register={register}
                    type={"text"}
                    markAsMandatory={true}
                    error={t(errors.email?.message?.toString())}
                    label={"Email"}
                />
            </div>

            <div className="mt-2">
                <InputControl
                    name={"firstName"}
                    register={register}
                    type={"text"}
                    markAsMandatory={true}
                    error={t(errors.firstName?.message?.toString())}
                    label={"First name"}
                />
            </div>
            <div className="mt-2">
                <InputControl
                    name={"lastName"}
                    register={register}
                    type={"text"}
                    markAsMandatory={true}
                    error={t(errors.lastName?.message?.toString())}
                    label={"Last name"}
                />
            </div>

            <div className="mt-2">
                <InputControl
                    name={"phone"}
                    register={register}
                    type={"text"}
                    error={t(errors.phone?.message?.toString())}
                    label={"Phone number"}
                />
            </div>
            <br/>
            <SubHeadingPurple>Your message</SubHeadingPurple>
            <div className="mt-2">
                {errors.messageText?.message && (
                    <span className="text-danger">{errors.messageText?.message.toString()}</span>)}
                <span className="text-danger">*</span>
                <textarea
                    {...register("messageText")}
                    name={"messageText"}
                    style={{borderRadius: "0px"}}
                    className={"form-control"}
                    rows={5}
                />
            </div>

            <ButtonPrimary className="mt-2" type="submit">
                {t("submit")}
            </ButtonPrimary>
        </form>


    );
};

export default ContactForm;
