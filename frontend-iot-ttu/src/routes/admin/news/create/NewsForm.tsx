import {
    Control, FieldValues,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister, UseFormSetFocus,
    UseFormSetValue,
} from "react-hook-form";
import ReactQuill from "react-quill";
import {useTranslation} from "react-i18next";
import NewsTopicAreaInput from "./NewsTopicAreaInput";
import ImageUploader from "../../../../components/form/ImageUpload";
import {INewsOutputDTO} from "../../../../dto/news/INewsOutputDTO";
import InputControl from "../../../../components/form/InputControl";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import React, {useEffect, useState} from "react";
import {formats, modules} from "../../../../configs/configurations";
import {Col, FormFloating, FormLabel, FormSelect, Row} from "react-bootstrap";

interface IProps {
    register: UseFormRegister<INewsOutputDTO>;
    errors: any;
    control: Control<INewsOutputDTO, any>;
    onEditorStateChangeEng: (html: string) => void;
    onEditorChangeEst: (html: string) => void;
    editorHtmlEng: string;
    editorHtmlEst: string;
    setValue: UseFormSetValue<INewsOutputDTO>;
    getValues: UseFormGetValues<INewsOutputDTO>;
    setFocus: UseFormSetFocus<INewsOutputDTO>;
    onSubmit: (event: any) => void;
    handleSubmit: UseFormHandleSubmit<INewsOutputDTO, undefined>;
}

const NewsForm: React.FC<IProps> =
    ({
         register,
         errors,
         control,
         onEditorStateChangeEng,
         onEditorChangeEst,
         editorHtmlEng,
         editorHtmlEst,
         onSubmit,
         setValue,
        setFocus,
         getValues,
         handleSubmit,
     }) => {
        useEffect(() => {
            setValue(`title.${0}.culture`, "en");
            setValue(`title.${1}.culture`, "et");
            setValue(`body.${0}.culture`, "en");
            setValue(`body.${1}.culture`, "et");
        }, []);

        const [editorLanguage, setEditorLanguage] = useState("EN");


        const {t} = useTranslation();
        return (
            <form onSubmit={
                handleSubmit((dto) => {
                    onSubmit(dto);
                })
            } id="news-form">
                <SubHeadingPurple>
                    {t("admin.news.adminNews.create.titles")}
                </SubHeadingPurple>

                <div className="mt-2">
                    <InputControl
                        name={`title.${0}.value`}
                        register={register}
                        type="text"
                        error={t(errors.title?.[0]?.value?.message?.toString())}
                        label={t("admin.news.adminNews.create.titleInEnglish")}
                    />
                </div>
                <div className="mt-2">
                    <InputControl
                        name={`title.${1}.value`}
                        register={register}
                        type="text"
                        error={t(errors.title?.[1]?.value?.message?.toString())}
                        label={t("admin.news.adminNews.create.titleInEstonian")}
                    />
                </div>

                <SubHeadingPurple className="mt-5">
                    {t("admin.news.adminNews.create.thumbnail")}
                </SubHeadingPurple>


                <FormLabel>{errors.image?.message &&
                    <span className="text-danger"> {t(errors.image?.message.toString())}</span>
                }
                </FormLabel>
                <ImageUploader
                    label={t("admin.news.adminNews.create.uploadPoster")}
                    register={register}
                    setValue={setValue}
                    getValue={getValues}
                    name={"image"}
                    fileSize={5}
                />

                <Row>
                    <Col md={6}>
                        <SubHeadingPurple className="mt-5">
                            {t("admin.news.adminNews.create.author")}
                        </SubHeadingPurple>
                        <InputControl
                            name={"author"}
                            register={register}
                            type="text"
                            error={t(errors.author?.message?.toString())}
                            label={t("admin.news.adminNews.create.authorName")}
                        />
                    </Col>

                    <Col md={6}>
                        <div className={"mt-4"}>
                        <NewsTopicAreaInput
                            control={control}
                            setFocus={setFocus}
                            setValue={setValue}
                            register={register}
                            errors={errors}
                        />
                        </div>
                    </Col>

                </Row>


                <SubHeadingPurple className="mt-5">
                    {t("common.postContent")}
                </SubHeadingPurple>

                <div
                    className={"text-danger"}>{errors.body?.[0]?.value?.message !== undefined ? t("common.engRequired") : ""}</div>
                <div
                    className={"text-danger"}>{errors.body?.[1]?.value?.message !== undefined ? t("common.estRequired") : ""}</div>
                <FormFloating>
                    <FormSelect id={"editor-language"} className={"b-radius-0"} value={editorLanguage}
                                onChange={(e) => setEditorLanguage(e.target.value)}>
                        <option value={"EN"}>EN</option>
                        <option value={"ET"}>ET</option>
                    </FormSelect>
                    <FormLabel htmlFor={"editor-language"}>Editor language</FormLabel>
                </FormFloating>


                <div className={editorLanguage === "EN" ? "" : "d-none"}>
                    <ReactQuill
                        theme="snow"
                        value={editorHtmlEng}
                        onChange={onEditorStateChangeEng}
                        modules={modules}
                        formats={formats}
                    />
                </div>

                <div className={editorLanguage === "ET" ? "" : "d-none"}>
                    <ReactQuill
                        theme="snow"
                        value={editorHtmlEst}
                        onChange={onEditorChangeEst}
                        modules={modules}
                        formats={formats}
                    />
                </div>

                <ButtonPrimary className="mt-5" type="submit">
                    {t("admin.news.adminNews.create.create")}
                </ButtonPrimary>
            </form>
        );
    };

export default NewsForm;
