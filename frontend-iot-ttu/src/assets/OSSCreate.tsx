import PageTitle from "../components/common/PageTitle";
import * as yup from "yup";
import {OpenSourceSolutionService} from "../services/OpenSourceSolutionService";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import {IOpenSourceSolutionOutput} from "../dto/opensourcesolutions/IOpenSourceSolutionOutput";
import i18n from "i18next";
import {yupResolver} from "@hookform/resolvers/yup";
import {SuccessAlert} from "../components/lottie/SuccessAlert";
import InputControl from "../components/form/InputControl";
import {Form, FormCheck} from "react-bootstrap";
import ButtonPrimary from "../components/common/ButtonPrimary";
import LayoutNoHeader from "../components/structure/LayoutNoHeader";

const schema = yup.object().shape({
    id: yup.string().uuid().nullable(),
    body: yup.array().length(2).of(yup.object().shape({
        value: yup.string().required(),
        culture: yup.string().required()
    })).required(),
    title: yup.array().length(2).of(yup.object().shape({
        value: yup.string().required(),
        culture: yup.string().required()
    })).required(),
    link: yup.string().url().required(),
    private: yup.boolean().required()
})

const OSSCreate = () => {
    const service = new OpenSourceSolutionService();
    const {t} = useTranslation();
    const [errorResponse, setErrorResponse] = useState("");
    const navigate = useNavigate();
    const [pendingSubmit, setPendingSubmit] = useState(false);
    const [success, setSuccess] = useState(false);
    const {id} = useParams();

    const onSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setPendingSubmit(false);
            navigate(`../`);
        }, 1000)
    }

    const onSubmit = (fieldValues: FieldValues) => {
        setPendingSubmit(true);
        setErrorResponse("");
        if (fieldValues.id === undefined) {
            service.create(fieldValues as IOpenSourceSolutionOutput).then(() => {
                onSuccess();
            }).catch((e) => {
                setErrorResponse(e.message)
            })
        } else {
            service.update(fieldValues as IOpenSourceSolutionOutput).then(() => {
                onSuccess();
            }).catch((e) => {
                setErrorResponse(e.message)
            })
        }
    }

    const {
        register,
        reset,
        setValue,
        handleSubmit, formState: {errors}
    } =
        useForm<IOpenSourceSolutionOutput>({resolver: yupResolver(schema)});

    const fetch = () => {
        service.getMultilang(id ?? "").then(resp => {
            reset();
            setValue(`body.0.value`, resp.body.find(b => b.culture === "en")?.value!);
            setValue(`body.1.value`, resp.body.find(b => b.culture === "et")?.value!);
            setValue(`title.0.value`, resp.title.find(b => b.culture === "et")?.value!);
            setValue(`title.1.value`, resp.title.find(b => b.culture === "et")?.value!);
            setValue(`link`, resp.link);
            setValue(`private`, resp.private);
            setValue(`id`, resp.id);
            setLangs();
        });
    }

    useEffect(() => {
        if (id !== undefined) {
            fetch();
        }
    }, []);

    const setLangs = () => {
        setValue(`body.0.culture`, "en");
        setValue(`body.1.culture`, "et");
        setValue(`title.0.culture`, "en");
        setValue(`title.1.culture`, "et");
    }

    useEffect(() => {
        setLangs();
    }, []);

    return (<LayoutNoHeader bodyContent={<>
        <PageTitle>{t("oss.title")}</PageTitle>
        {errorResponse && <p>{errorResponse}</p>}
        {success && <SuccessAlert/>}
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className={"mt-2"}>
                <InputControl
                    register={register}
                    error={errors.title?.[0]?.value?.message}
                    name={"title.0.value"}
                    label={t("projects.titleEng")}/>
            </div>
            <div className={"mt-2"}>
                <InputControl
                    register={register}
                    error={errors.title?.[1]?.value?.message}
                    name={"title.1.value"}
                    label={t("projects.titleEst")}/>
            </div>
            <div className={"mt-2"}>
                <InputControl
                    register={register}
                    error={errors.body?.[0]?.value?.message}
                    name={"body.0.value"}
                    label={t("oss.descriptionEng")}/>
            </div>
            <div className={"mt-2"}>
                <InputControl
                    register={register}
                    error={errors.body?.[1]?.value?.message}
                    name={"body.1.value"}
                    label={t("oss.descriptionEst")}/>
            </div>
            <div className={"mt-2"}>
                <InputControl
                    register={register}
                    error={errors.link?.message}
                    name={"link"}
                    label={t("oss.link")}/>
            </div>
            <div className={"mt-2"}>
                <FormCheck
                    {...register("private")}
                    label={t("oss.privateRepo")}
                    type={"switch"}
                />
            </div>
            <ButtonPrimary
                className="btn_custom_out mt-5 w-25 align-self-center" type={"button"}
                onClick={handleSubmit(onSubmit)}>
                {t("common.submit")}
            </ButtonPrimary>
        </Form>
    </>}/>
    );
};

export default OSSCreate;