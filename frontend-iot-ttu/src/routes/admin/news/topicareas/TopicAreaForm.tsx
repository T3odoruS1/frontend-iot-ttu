import * as yup from "yup";
import {TopicAreaService} from "../../../../services/TopicAreaService";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {ITopicAreaPost} from "../../../../dto/topicarea/ITopicAreaPost";
import {yupResolver} from "@hookform/resolvers/yup";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import {Form} from "react-bootstrap";
import i18n from "i18next";
import InputControl from "../../../../components/form/InputControl";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {useNavigate} from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import ErrorPage from "../../../ErrorPage";
import {ITopicAreaGet} from "../../../../dto/topicarea/ITopicAreaGet";
import LayoutNoHeader from "../../../../components/structure/LayoutNoHeader";

const schema = yup.object().shape({
    name: yup.array().of(yup.object().shape({
        value: yup.string().trim().required(),
        culture: yup.string().required()
    }))
        .required()
        .min(2)
})

const TopicAreaForm = () => {
    const topicAreaService = new TopicAreaService();
    const {t} = useTranslation();
    const {data: topicAreas, pending: pendingTopicAreas, error: topicAreasError} =
        useFetch<ITopicAreaGet[]>(topicAreaService.getAll, [i18n.language]);
    const [errorResponse, setErrorResponse] = useState("");
    const navigate = useNavigate();
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ITopicAreaPost>({resolver: yupResolver(schema)});
    const onSubmit = async (formValues: FieldValues) => {
        const data = formValues as ITopicAreaPost;

        topicAreaService.create(data)
            .then(() => navigate(`/${i18n.language}/admin/news`, {replace: true}))
            .catch((err) => {
                setErrorResponse(err.message)
            });

    }

    useEffect(() => {
        setValue(`name.0.culture`, "en");
        setValue(`name.1.culture`, "et");
    }, []);

    if(!pendingTopicAreas && !topicAreas){
        return <ErrorPage/>
    }

    return (<LayoutNoHeader bodyContent={
            <>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <SubHeadingPurple>{t("admin.topicAreas.createTopicArea")}</SubHeadingPurple>
                    {errorResponse && <div className={"text-danger"}>
                        {t(`admin.topicAreas.${errorResponse}`)}
                    </div>}

                    <div className={"mt-2"}>
                        <InputControl type={"text"} error={errors.name?.[0]?.value?.message}
                                      register={register}
                                      name={'name.0.value'} label={"Topic area in english"}/>
                    </div>
                    <div className={"mt-2"}>
                        <InputControl type={"text"} error={errors.name?.[1]?.value?.message} register={register}
                                      name={'name.1.value'} label={"Topic area in estonian"}/>
                    </div>
                    <ButtonPrimary
                        className="btn_custom_out m-2 w-25 align-self-center" type={"button"}
                        onClick={handleSubmit(onSubmit)}>
                        Submit
                    </ButtonPrimary>
                </Form>
            </>
        }/>
    );
};

export default TopicAreaForm;