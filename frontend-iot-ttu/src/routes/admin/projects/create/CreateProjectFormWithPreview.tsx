import {FieldValues, useForm} from "react-hook-form";
import * as yup from "yup";
import {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import PageTitle from "../../../../components/common/PageTitle";
import {FormCheck, FormFloating} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ProjectForm} from "./ProjectForm";
import {useParams} from "react-router-dom";
import {ProjectService} from "../../../../services/ProjectService";
import {ProjectPreview} from "./ProjectPreview";
import {IProjectMultilang} from "../../../../dto/project/IProjectMultilang";
import useFetch from "../../../../hooks/useFetch";

interface IProps {
    onSubmit: (event: FieldValues) => void;
}

const schema = yup.object().shape({
    id: yup.string().uuid().optional(),
    year: yup.number().typeError(`admin.projects.validation.year`).min(0).max(3000).required(),
    projectManager: yup.string().required("admin.news.adminNews.create.validation.fieldIsRequired"),
    projectVolume: yup.number().typeError(`admin.projects.validation.projectVolume`).min(0).max(2000000000).required(),
    image: yup.string().nullable(),
    title: yup
        .array()
        .length(2)
        .of(
            yup.object().shape({
                value: yup.string().min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).max(90, "Too long insert transation ").required(),
                culture: yup.string().min(1, "").required(),
            })
        )
        .required(),
    body: yup
        .array()
        .length(2)
        .of(
            yup.object().shape({
                value: yup.string().min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
                culture: yup.string().min(1, "").required(),
            })
        )
        .required()
})

interface IProps {
    onSubmit: (event: FieldValues) => void;
}


const CreateProjectFormWithPreview = (props: IProps) => {
    const {t} = useTranslation();
    const [editorHtmlEng, setEditorHtmlEng] = useState<string>("");
    const [editorHtmlEst, setEditorHtmlEst] = useState<string>("");
    const [preview, setPreview] = useState<boolean>(false);
    const projectService = new ProjectService();
    const {id} = useParams();

    const [updateCase, setUpdateCase] = useState(id !== undefined);

    const {data: project, pending, error} =
        useFetch<IProjectMultilang>(projectService.getPreview, [id ?? ""]);


    useEffect(() => {
        if(updateCase && project){
            setFormValues();
        }
    }, [project]);

    const setFormValues = () => {
        onEditorStateChangeEng(project!.body.find(b => {
            return b.culture === "en"
        })?.value ?? "");
        onEditorStateChangeEst(project!.body.find(b => {
            return b.culture === "et"
        })?.value ?? "");

        setValue(`title.0.value`, project!.title!.find(t => {
            return t.culture === "en"
        })?.value ?? "");
        setValue(`title.0.culture`, "en")

        setValue(`title.1.value`, project!.title!.find(t => {
            return t.culture === "et"
        })?.value ?? "");
        setValue(`title.1.culture`, "et");
        setValue(`id`, project!.id);
        setValue("year", project!.year);
        setValue("projectManager", project!.projectManager);
        setValue("projectVolume", project!.projectVolume);
    }



    const onEditorStateChangeEng = (html: string) => {
        setValue(`body.${0}.value`, html);
        setEditorHtmlEng(html);
    };

    const onEditorStateChangeEst = (html: string) => {
        setValue(`body.${1}.value`, html);
        setEditorHtmlEst(html);
    };

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<IProjectOutput>({
        resolver: yupResolver(schema),
    });

    return (
        <>
            <div className="">
                <PageTitle>{t('projects.projects')}</PageTitle>
                <FormFloating>
                    <FormCheck
                        type="checkbox"
                        id="custom-switch"
                        label={t("common.togglePreview")}
                        checked={preview}
                        onChange={() => {
                            setPreview(!preview);
                        }}
                    />

                </FormFloating>
            </div>

            <hr/>
            <div className="w-100" style={{display: preview ? "none" : "block"}}>
                <ProjectForm
                    control={control}
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onEditorStateChangeEng={onEditorStateChangeEng}
                    onEditorChangeEst={onEditorStateChangeEst}
                    editorHtmlEng={editorHtmlEng}
                    editorHtmlEst={editorHtmlEst}
                    onSubmit={props.onSubmit}
                    setValue={setValue}
                    getValues={getValues}
                />
            </div>
            <div style={{display: preview ? "block" : "none"}}>
                <ProjectPreview formValues={getValues()}/>
            </div>
        </>
    );
};

export default CreateProjectFormWithPreview;