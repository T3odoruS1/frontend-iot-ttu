import PageTitle from "../../../../../components/common/PageTitle";
import InputControl from "../../../../../components/form/InputControl";
import {Form} from "react-bootstrap";
import * as yup from "yup";
import {FieldValues, set, useForm} from "react-hook-form";
import {IContactPersonOutput} from "../../../../../dto/contact/people/IContactPersonOutput";
import {yupResolver} from "@hookform/resolvers/yup";
import {IBannerOutput} from "../../../../../dto/banner/IBannerOutput";
import ImageUploader from "../../../../../components/form/ImageUpload";
import {BannerService} from "../../../../../services/BannerService";
import ButtonPrimary from "../../../../../components/common/ButtonPrimary";
import React, {useEffect, useState} from "react";
import i18n from "i18next";
import {useNavigate, useParams} from "react-router-dom";
import {SuccessAlert} from "../../../../../components/lottie/SuccessAlert";
import {useTranslation} from "react-i18next";

const schema = yup.object().shape({
    id: yup.string().uuid().nullable(),
    image: yup.string().required("common.requiredField"),
    body: yup.array().length(2).of(yup.object().shape({
        value: yup.string().required("common.requiredField").max(45, "common.toolong"),
        culture: yup.string().required("common.requiredField")
    })).required("common.requiredField"),
    title: yup.array().length(2).of(yup.object().shape({
        value: yup.string().required("common.requiredField").max(90, "common.toolong"),
        culture: yup.string().required("common.requiredField")
    })).required("common.requiredField"),
})


const BannerCreate = () => {
    const navigate = useNavigate();
    const service = new BannerService();
    const [success, setSuccess] = useState(false);
    const [errorResponse, setErrorResponse] = useState("");
    const [pending, setPending] = useState(false);

    const {id} = useParams();


    const onSubmit = (fieldValues: FieldValues) => {
        // setPending(true);
        if (fieldValues.id === undefined) {
            service.create(fieldValues as IBannerOutput).then(res => {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    navigate(`/${i18n.language}/admin/banners`);
                }, 1000)
            }).catch((err) => {
                console.log(err)
                setErrorResponse(err.message);
            }).finally(() => setPending(false))
        } else {
            service.update(fieldValues as IBannerOutput).then(res => {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    navigate(`/${i18n.language}/admin/banners`);
                }, 1000)
            }).catch((err) => {
                console.log(err)
                setErrorResponse(err.message);
            }).finally(() => setPending(false))
        }

    }

    const {t} = useTranslation();
    const {
        register,
        setValue,
        getValues,
        reset,
        handleSubmit,
        formState: {errors},
    } =
        useForm<IBannerOutput>({resolver: yupResolver(schema), shouldUnregister: false});


    const setLangs = () => {
        setValue(`body.0.culture`, "en");
        setValue(`body.1.culture`, "et");
        setValue(`title.0.culture`, "en");
        setValue(`title.1.culture`, "et");
    }


    const fetch = () => {
        service.getMultilangById(id ?? "").then(resp => {
            reset();
            setValue(`body.0.value`, resp.body.find(b => b.culture === "en")?.value!);
            setValue(`body.1.value`, resp.body.find(b => b.culture === "et")?.value!);
            setValue(`title.0.value`, resp.title.find(b => b.culture === "et")?.value!);
            setValue(`title.1.value`, resp.title.find(b => b.culture === "et")?.value!);
            setValue(`image`, resp.image);
            setValue(`id`, resp.id);
            setLangs();
        });
    }

    useEffect(() => {
        if (id !== undefined) {
            fetch();
        }
    }, []);

    useEffect(() => {
        setLangs();
    }, []);


    return (
        <>
            <PageTitle>{t("banners.createTitle")}</PageTitle>
            {errorResponse && <p>{errorResponse}</p>}
            {success && <SuccessAlert/>}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className={"mt-2"}>
                    <InputControl
                        register={register}
                        error={t(errors.title?.[0]?.value?.message, {len: 45})}
                        name={"title.0.value"}
                        label={"Main title english"}/>
                </div>
                <div className={"mt-2"}>
                    <InputControl
                        register={register}
                        error={t(errors.title?.[1]?.value?.message, {len: 45})}
                        name={"title.1.value"}
                        label={"Main title estonian"}/>
                </div>
                <div className={"mt-2"}>
                    <InputControl
                        register={register}
                        error={t(errors.body?.[0]?.value?.message, {len: 90})}
                        name={"body.0.value"}
                        label={"Main title english"}/>
                </div>
                <div className={"mt-2"}>
                    <InputControl
                        register={register}
                        error={t(errors.body?.[1]?.value?.message, {len: 90})}
                        name={"body.1.value"}
                        label={"Main title estonian"}/>
                </div>
                <div className={"mt-2"}>
                    {t(errors.image?.message)}
                    <ImageUploader
                        register={register}
                        setValue={setValue}
                        getValue={getValues}
                        name={"image"}
                        label={"image"}
                        fileSize={5}/>
                </div>
                <ButtonPrimary
                    className="btn_custom_out mt-5 w-25 align-self-center" type={"button"}
                    onClick={handleSubmit(onSubmit)}>
                    {t("Saata")}
                </ButtonPrimary>
            </Form>
        </>
    );
};

export default BannerCreate;