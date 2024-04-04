import {FormControl, FormFloating, FormLabel} from "react-bootstrap";
import * as yup from "yup";
import {MailService} from "../../../services/MailService";
import {FieldValues, useForm} from "react-hook-form";
import {IContactDto} from "../../../dto/contact/IContactDto";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import InputControl from "../../../components/form/InputControl";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import React, {useEffect, useState} from "react";
import {IErrorResponse} from "../../../dto/IErrorResponse";
import {NewsService} from "../../../services/NewsService";
import {ProjectService} from "../../../services/ProjectService";
import ButtonContent from "../../../components/common/ButtonContent";


const schema = yup.object().shape({
    email: yup.string().email("public.contact.validEmail").required("admin.news.adminNews.create.validation.fieldIsRequired"),
    firstName: yup.string().required("admin.news.adminNews.create.validation.fieldIsRequired"),
    lastName: yup.string().required("admin.news.adminNews.create.validation.fieldIsRequired"),
    phone: yup.string().optional(),
    messageText: yup.string().required("admin.news.adminNews.create.validation.fieldIsRequired")
})

const ContactForm = () => {

    const mailService = new MailService();
    const {t} = useTranslation();
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(true);
    const location = useLocation();
    const newsService = new NewsService();
    const projectService = new ProjectService();
    const [pending, setPending] = useState(false);

    const onSubmit = (fieldValues: FieldValues) => {
        setPending(true);
        mailService.contact(fieldValues as IContactDto).then((response) => {
            setMessage("contact.success")
            setSuccess(true)
        }).catch(e => {
            setMessage("conatct.fail")
            setSuccess(false);
        }).finally(() => setPending(false))
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<IContactDto>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {


        const params = new URLSearchParams(location.search);
        if(params.has("fromNews")){
            newsService.getById("et", params.get("fromNews")!).then(news => {
                    setValue("messageText", `[Vaatasin uudist pealkirjaga: ${news.title}]`)
            }).catch(e => {});
        }else if(params.has("fromProject")){
            projectService.getById("et", params.get("fromProject")!).then(project => {
                setValue("messageText", `[Vaatasin projekti pealkirjaga: ${project.title}]`)
            }).catch(e => {});
        }

    }, []);


    return (


        <form onSubmit={handleSubmit((dto) => {
            onSubmit(dto);
        })}>
            <p className={success ? "text-success" : "text-danger"}>{t(message)}</p>
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
            <ButtonPrimary className="mt-2" type="submit">
                <ButtonContent isLoading={pending} content={t("public.contact.form.submit")}/>
            </ButtonPrimary>
        </form>


    );
};

export default ContactForm;
