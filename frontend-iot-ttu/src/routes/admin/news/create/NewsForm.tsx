import {
    Control,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
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
import React, {useEffect} from "react";
import {formats, modules} from "../../../../configs/configurations";
import {FormLabel} from "react-bootstrap";

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
         getValues,
         handleSubmit,
     }) => {
        useEffect(() => {
            setValue(`title.${0}.culture`, "en");
            setValue(`title.${1}.culture`, "et");
            setValue(`body.${0}.culture`, "en");
            setValue(`body.${1}.culture`, "et");
        }, []);




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

                <SubHeadingPurple className="mt-5">
                    {t("admin.news.adminNews.create.categories")}
                </SubHeadingPurple>
                {errors?.topicAreas?.message &&
                    <p><span className="text-danger"> {t(errors?.topicAreas?.message?.toString())}</span></p>
                }
                <NewsTopicAreaInput
                    control={control}
                    setValue={setValue}
                    register={register}
                    errors={errors}
                />

                <SubHeadingPurple className="mt-5">
                    {t("admin.news.adminNews.create.contentEng")}
                </SubHeadingPurple>
                <ReactQuill
                    theme="snow"
                    value={editorHtmlEng}
                    onChange={onEditorStateChangeEng}
                    modules={modules}
                    formats={formats}
                />

                <SubHeadingPurple className="mt-5">
                    {t("admin.news.adminNews.create.contentEst")}
                </SubHeadingPurple>
                <ReactQuill
                    theme="snow"
                    value={editorHtmlEst}
                    onChange={onEditorChangeEst}
                    modules={modules}
                    formats={formats}
                />
                <ButtonPrimary className="mt-5" type="submit">
                    {t("admin.news.adminNews.create.create")}
                </ButtonPrimary>
            </form>
        );
    };

export default NewsForm;
