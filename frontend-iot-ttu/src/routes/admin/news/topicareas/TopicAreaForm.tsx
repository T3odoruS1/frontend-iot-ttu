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
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import useTopicAreas from "../../../../hooks/useTopicAreas";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {useNavigate} from "react-router-dom";

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
    const {topicAreas, pending} = useTopicAreas();
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
        const result = await topicAreaService.create(data);
        if (result === undefined) {
            setErrorResponse("OOPS_SOMETHING_WRONG")
        }
        else if ("message" in result) {
            setErrorResponse(result.message);
        }else{
            // Success -> redirect
            navigate(`/${i18n.language}/admin/news`, {replace: true});
        }

    }

    useEffect(() => {
        setValue(`name.0.culture`, "en");
        setValue(`name.1.culture`, "et");
    }, []);
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <SubHeadingPurple>Create new topic area</SubHeadingPurple>
                {errorResponse && <div className={"text-danger"}>
                    {t(`admin.news.adminNews.create.${errorResponse}`)}
                </div>}
                <FormFloating className={"m-2"}>
                    <FormSelect
                        aria-label="Choose topic area"
                        className={"weight-fix"}
                        placeholder={"Choose topic area"}
                        style={{borderRadius: "0px"}}
                        {...register(`parentTopicId`)}
                        id={`parentTopicId`}
                        name={`parentTopicId`}>
                        <option></option>
                        {topicAreas.map((topicArea) => {
                            return (
                                <>
                                    <option

                                        id={topicArea.id}
                                        value={topicArea.id}
                                        key={topicArea.id}>
                                        {topicArea.name}
                                    </option>
                                </>
                            );
                        })}
                    </FormSelect>
                    <FormLabel htmlFor={"parentTopicId"}>Parent topic area</FormLabel>
                </FormFloating>

                <div className={"p-2"}>
                    <InputControl type={"text"} error={errors.name?.[0]?.value?.message}
                                  register={register}
                                  name={'name.0.value'} label={"Topic area in english"}/>
                </div>
                <div className={"p-2"}>
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