import * as yup from "yup";
import {TopicAreaService} from "../../../../services/TopicAreaService";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {ITopicAreaPost} from "../../../../dto/topicarea/ITopicAreaPost";
import {yupResolver} from "@hookform/resolvers/yup";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import {Form, FormFloating, FormLabel, FormSelect} from "react-bootstrap";
import i18n from "i18next";
import InputControl from "../../../../components/form/InputControl";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {useNavigate} from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import {ITopicAreaWithChildren} from "../../../../dto/topicarea/ITopicAreaWithChildren";
import ErrorPage from "../../../ErrorPage";

const schema = yup.object().shape({
    parentTopicId: yup.string().optional(),
    name: yup.array().of(yup.object().shape({
        value: yup.string().required(),
        culture: yup.string().required()
    }))
        .required()
        .min(2)
})

export const TopicAreaForm = () => {
    const topicAreaService = new TopicAreaService();
    const {t} = useTranslation();
    const {data: topicAreas, pending: pendingTopicAreas, error: topicAreasError} =
        useFetch<ITopicAreaWithChildren[]>(topicAreaService.getAll, [i18n.language]);
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
        data.parentTopicId = data.parentTopicId !== "" ? data.parentTopicId : undefined;

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

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <SubHeadingPurple>{t("admin.topicAreas.createTopicArea")}</SubHeadingPurple>
                {errorResponse && <div className={"text-danger"}>
                    {t(`admin.topicAreas.${errorResponse}`)}
                </div>}
                <FormFloating className={"mt-2"}>
                    <FormSelect
                        aria-label="Choose topic area"
                        className={"weight-fix"}
                        placeholder={"Choose topic area"}
                        style={{borderRadius: "0px"}}
                        {...register(`parentTopicId`)}
                        id={`parentTopicId`}
                        name={`parentTopicId`}>
                        <option key={-1}></option>
                        {topicAreas?.map((topicArea, index) => {
                            return (
                                    <option
                                        id={topicArea.id}
                                        value={topicArea.id}
                                        key={topicArea.id}>
                                        {topicArea.name}
                                    </option>

                            );
                        })}
                    </FormSelect>
                    <FormLabel htmlFor={"parentTopicId"}>Parent topic area</FormLabel>
                </FormFloating>

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
    );
};