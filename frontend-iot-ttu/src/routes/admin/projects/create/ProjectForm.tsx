import {Control, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {INewsOutputDTO} from "../../../../dto/news/INewsOutputDTO";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import InputControl from "../../../../components/form/InputControl";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import NewsTopicAreaInput from "../../news/create/NewsTopicAreaInput";

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

                <div className={"mt-2"}>
                    <InputControl
                        name={`title.${0}.value`}
                        register={register}
                        type="text"
                        error={"Eng errors"}
                        label={"Eng title lable"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`title.${1}.value`}
                        register={register}
                        type="text"
                        error={"Est errors"}
                        label={"ESt title lable"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`year`}
                        register={register}
                        type="number"
                        error={errors.year?.message?.toString()}
                        label={"Year"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`projectManager`}
                        register={register}
                        type="text"
                        error={errors.projectManager?.message?.toString()}
                        label={"Project manager"}
                    />
                </div>

                <div className={"mt-2"}>
                    <InputControl
                        name={`projectVolume`}
                        register={register}
                        type="number"
                        error={errors.projectVolume?.message?.toString()}
                        label={"Year"}
                    />
                </div>

                {/*<NewsTopicAreaInput*/}
                {/*    control={control}*/}
                {/*    setValue={setValue}*/}
                {/*    getValues={getValues}*/}
                {/*    register={register}*/}
                {/*    errors={errors}*/}
                {/*/>*/}
            </form>
        );
    };