import {Control, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import InputControl from "../../../../components/form/InputControl";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import ReactQuill from "react-quill";
import {formats, modules} from "../../../../configs/configurations";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {FormFloating, FormLabel, FormSelect} from "react-bootstrap";

interface IProps {
    register: UseFormRegister<IProjectOutput>;
    errors: any;
    control: Control<IProjectOutput, any>;
    onEditorStateChangeEng: (html: string) => void;
    onEditorChangeEst: (html: string) => void;
    editorHtmlEng: string;
    editorHtmlEst: string;
    setValue: UseFormSetValue<IProjectOutput>;
    getValues: UseFormGetValues<IProjectOutput>;
    onSubmit: (event: any) => void;
    handleSubmit: UseFormHandleSubmit<IProjectOutput, undefined>;
}

export const ProjectForm: React.FC<IProps> =
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
         handleSubmit,
     }) => {
        const {t} = useTranslation();


        useEffect(() => {
            setValue(`title.${0}.culture`, "en");
            setValue(`title.${1}.culture`, "et");
            setValue(`body.${0}.culture`, "en");
            setValue(`body.${1}.culture`, "et");
        }, []);

        const [editorLanguage, setEditorLanguage] = useState("EN");


        return (
            <form onSubmit={
                handleSubmit((dto) => {
                    onSubmit(dto);
                })
            } id={"project-form"}>

                <SubHeadingPurple className="mt-5">
                    {t("common.titles")}
                </SubHeadingPurple>


                <div className={"mt-2"}>
                    <InputControl
                        name={`title.${0}.value`}
                        register={register}
                        type="text"
                        error={t(errors.title?.[0]?.value?.message?.toString(), {len: 150})}
                        label={t("projects.titleEng")}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`title.${1}.value`}
                        register={register}
                        type="text"
                        error={t(errors.title?.[1]?.value?.message?.toString(), {len: 150})}
                        label={t("projects.titleEst")}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`year`}
                        register={register}
                        type="number"
                        defaultValue={new Date().getFullYear()}
                        error={t(errors.year?.message?.toString())}
                        label={t("projects.year")}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`projectManager`}
                        register={register}
                        type="text"
                        error={t(errors.projectManager?.message?.toString())}
                        label={t("projects.projectManager")}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`projectVolume`}
                        register={register}
                        defaultValue={0}
                        type="number"
                        error={t(errors.projectVolume?.message?.toString())}
                        label={t("projects.projectVolume")}
                    />
                </div>

                <SubHeadingPurple className="mt-5">
                    {t("common.postContent")}
                </SubHeadingPurple>

                <FormFloating className={"mt-2 mb-2"}>
                    <FormSelect id={"editor-language"} className={"b-radius-0"} value={editorLanguage}
                                onChange={(e) => setEditorLanguage(e.target.value)}>
                        <option value={"EN"}>EN</option>
                        <option value={"ET"}>ET</option>
                    </FormSelect>
                    <FormLabel htmlFor={"editor-language"}>Editor language</FormLabel>
                </FormFloating>
                <div
                    className={"text-danger"}>{errors.body?.[0]?.value?.message !== undefined ? t("common.engRequired") : ""}</div>
                <div
                    className={"text-danger"}>{errors.body?.[1]?.value?.message !== undefined ? t("common.estRequired") : ""}</div>


                <div className={editorLanguage === "EN" ? "" : "d-none"}>
                    <ReactQuill
                        theme="snow"
                        value={editorHtmlEng}
                        onChange={onEditorStateChangeEng}
                        modules={modules}
                        formats={formats}
                    />
                </div>


                {/*<SubHeadingPurple className="mt-5">*/}
                {/*    {t("admin.news.adminNews.create.contentEst")}*/}
                {/*</SubHeadingPurple>*/}

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