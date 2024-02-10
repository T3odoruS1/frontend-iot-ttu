import PageTitle from "../../../../../components/common/PageTitle";
import InputControl from "../../../../../components/form/InputControl";
import {Form} from "react-bootstrap";
import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {IContactPersonOutput} from "../../../../../dto/contact/people/IContactPersonOutput";
import {yupResolver} from "@hookform/resolvers/yup";
import {IBannerOutput} from "../../../../../dto/banner/IBannerOutput";
import ImageUploader from "../../../../../components/form/ImageUpload";
import {BannerService} from "../../../../../services/BannerService";
import ButtonPrimary from "../../../../../components/common/ButtonPrimary";
import React, {useEffect, useState} from "react";
import i18n from "i18next";
import {useNavigate} from "react-router-dom";
import {SuccessAlert} from "../../../../../components/lottie/SuccessAlert";

const schema = yup.object().shape({
    id: yup.string().uuid().nullable(),
    image: yup.string().required(),
    body: yup.array().length(2).of(yup.object().shape({
        value: yup.string().required(),
        culture: yup.string().required()
    })).required(),
    title: yup.array().length(2).of(yup.object().shape({
        value: yup.string().required(),
        culture: yup.string().required()
    })).required(),
})


export const BannerCreate = () => {
    const navigate = useNavigate();
    const service = new BannerService();
    const [success, setSuccess] = useState(false);
    const [errorResponse, setErrorResponse] = useState("");

    const onSubmit = (fieldValues: FieldValues) => {
        service.create(fieldValues as IBannerOutput).then(res =>{
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate(`/${i18n.language}/admin/banners`);
            }, 1000)
        }).catch((err) => {
            console.log(err)
            setErrorResponse(err.message);
        })
    }

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: {errors},
    } =
        useForm<IBannerOutput>({resolver: yupResolver(schema)});

    useEffect(() => {
        setValue(`body.0.culture`, "en");
        setValue(`body.1.culture`, "et");
        setValue(`title.0.culture`, "en");
        setValue(`title.1.culture`, "et");
    }, []);

    return (
        <>
            <PageTitle>Create/update banner</PageTitle>
            {errorResponse && <p>{errorResponse}</p>}
            {success && <SuccessAlert/>}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className={"mt-2"}>
                    <InputControl register={register} name={"title.0.value"} label={"Main title english"}/>
                </div>
                <div className={"mt-2"}>
                    <InputControl register={register} name={"title.1.value"} label={"Main title estonian"}/>
                </div>
                <div className={"mt-2"}>
                    <InputControl register={register} name={"body.0.value"} label={"Main title english"}/>
                </div>
                <div className={"mt-2"}>
                    <InputControl register={register} name={"body.1.value"} label={"Main title estonian"}/>
                </div>
                <div className={"mt-2"}>
                    <ImageUploader register={register} setValue={setValue} getValue={getValues} name={"image"}
                                   label={"image"} fileSize={5}/>
                </div>
                <ButtonPrimary
                    className="btn_custom_out mt-5 w-25 align-self-center" type={"button"}
                    onClick={handleSubmit(onSubmit)}>
                    Submit
                </ButtonPrimary>
            </Form>
        </>
    );
};