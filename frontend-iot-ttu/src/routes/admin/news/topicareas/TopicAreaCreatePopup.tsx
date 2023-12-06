import React, {useEffect, useState} from "react";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import {TopicAreaService} from "../../../../services/TopicAreaService";
import * as yup from "yup";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import {ITopicAreaGetMultilang} from "../../../../dto/topicarea/ITopicAreaGetMultilang";
import {FieldValues, useForm} from "react-hook-form";
import {ITopicAreaPost} from "../../../../dto/topicarea/ITopicAreaPost";
import {yupResolver} from "@hookform/resolvers/yup";
import InputControl from "../../../../components/form/InputControl";
import {Form, FormFloating, FormLabel, FormSelect} from "react-bootstrap";
import i18n from "i18next";
import {IBaseEntity} from "../../../../dto/IBaseEntity";
import {useTranslation} from "react-i18next";

const schema = yup.object().shape({
    parentTopicId: yup.string().optional(),
    name: yup.array().of(yup.object().shape({
        value: yup.string().required(),
        culture: yup.string().required()
    }))
        .required()
        .min(2)
})

const TopicAreaCreatePopup: React.FC<{ topicAreas: ITopicAreaGetMultilang[] }> = ({topicAreas}) => {
    const topicAreaService = new TopicAreaService();
    const {t} = useTranslation();
    const [errorResponse, setErrorResponse] = useState("");
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ITopicAreaPost>({resolver: yupResolver(schema)});
    const [confirmDelete, setConfirmDelete] = useState(false);

    const onSubmit = async (formValues: FieldValues) => {
        const data = formValues as ITopicAreaPost;
        data.parentTopicId = data.parentTopicId !== "" ? data.parentTopicId : undefined;
        const result = await topicAreaService.create(data);
        if (result === undefined) {
            setErrorResponse("Oops... Something went wrong")
        }
        else if ("id" in result) {
            // Success
            setConfirmDelete(false);
        }
        else if ("message" in result) {
            setErrorResponse(result.message);
        }

    }

    useEffect(() => {
        if (confirmDelete) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        setValue(`name.0.culture`, "en");
        setValue(`name.1.culture`, "et");
    }, [confirmDelete]);


    if (confirmDelete) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: 'blur(25px)',
                    zIndex: 9999,
                }}>
                <div className="card_custom_form">
                    <div className={"close-button-div m-2 mt-3"}>
                        <button type={"button"} className="close-button" onClick={() => setConfirmDelete(false)}>
                            {"X"}</button>
                    </div>
                    <div className={"px-3 pb-3 d-flex flex-column"}>
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
                                                    {topicArea.content.find(topicArea => topicArea.culture === i18n.language)?.value ?? ""}
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
                                <ButtonSmaller
                                className="btn_custom_out m-2 w-25 align-self-center" type={"button"}
                                onClick={handleSubmit(onSubmit)}>
                                Submit
                            </ButtonSmaller>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ButtonSmaller
            type="button"
            onClick={() => setConfirmDelete(true)}>
            {t('admin.news.adminNews.create.createTopicArea')}
        </ButtonSmaller>

    );

};

export default TopicAreaCreatePopup;