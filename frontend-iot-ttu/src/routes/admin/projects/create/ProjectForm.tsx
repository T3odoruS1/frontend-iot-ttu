import {Control, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue} from "react-hook-form";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import InputControl from "../../../../components/form/InputControl";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import ReactQuill from "react-quill";
import {formats, modules} from "../../../../configs/configurations";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";

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
         getValues,
         handleSubmit,
     }) => {
        const {t} = useTranslation();


        useEffect(() => {
            setValue(`title.${0}.culture`, "en");
            setValue(`title.${1}.culture`, "et");
            setValue(`body.${0}.culture`, "en");
            setValue(`body.${1}.culture`, "et");
        }, []);


        return (
            <form onSubmit={
                handleSubmit((dto) => {
                    onSubmit(dto);
                })
            } id={"project-form"}>

                <SubHeadingPurple className="mt-5">
                    General fileds
                </SubHeadingPurple>


                <div className={"mt-2"}>
                    <InputControl
                        name={`title.${0}.value`}
                        register={register}
                        type="text"
                        error={t(errors.title?.[0]?.value?.message?.toString())}
                        label={"English title"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`title.${1}.value`}
                        register={register}
                        type="text"
                        error={t(errors.title?.[1]?.value?.message?.toString())}
                        label={"Estonian title"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`year`}
                        register={register}
                        type="number"
                        defaultValue={new Date().getFullYear()}
                        error={t(errors.year?.message?.toString())}
                        label={"Year"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`projectManager`}
                        register={register}
                        type="text"
                        error={t(errors.projectManager?.message?.toString())}
                        label={"ProjectDetails manager"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`projectVolume`}
                        register={register}
                        defaultValue={0}
                        type="number"
                        error={t(errors.projectVolume?.message?.toString())}
                        label={"ProjectDetails volume"}
                    />
                </div>

                <p>Skip image for now</p>

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