import {FieldValues, useForm} from "react-hook-form";
import * as yup from "yup";
import {useState} from "react";
import useTranslatedTopicAreas from "../../../../hooks/useTranslatedTopicAreas";
import {yupResolver} from "@hookform/resolvers/yup";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import PageTitle from "../../../../components/common/PageTitle";
import {FormCheck, FormFloating} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ProjectForm} from "./ProjectForm";

interface IProps {
    onSubmit: (event: FieldValues) => void;
}

const schema = yup.object().shape({
    year: yup.number().typeError(`admin.projects.validation.year`).min(0).max(3000).required(),
    projectManager: yup.string().required("admin.news.adminNews.create.validation.fieldIsRequired"),
    projectVolume: yup.number().typeError(`admin.projects.validation.projectVolume`).min(0).required(),
    image: yup.string().nullable(),
    title: yup
        .array()
        .length(2)
        .of(
            yup.object().shape({
                value: yup.string().min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
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
        .required(),
    topicAreas: yup
        .array(
            yup.object().shape({
                id: yup.string().uuid(`admin.news.adminNews.create.validation.topicAreaMandatory`).required(),
            })
        )
        .required(`admin.news.adminNews.create.validation.topicAreaMandatory`)
        .min(1, `admin.news.adminNews.create.validation.topicAreaMandatory`)
})

interface IProps {
    onSubmit: (event: FieldValues) => void;
}


const CreateProjectFormWithPreview = (props: IProps) => {
    const {t} = useTranslation();
    const [editorHtmlEng, setEditorHtmlEng] = useState<string>("");
    const [editorHtmlEst, setEditorHtmlEst] = useState<string>("");
    const [preview, setPreview] = useState<boolean>(false);
    const {topicAreas, pending} = useTranslatedTopicAreas();

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
                <PageTitle>Projects translate</PageTitle>
                <FormFloating>
                    <FormCheck
                        type="checkbox"
                        id="custom-switch"
                        label="Preview"
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

        </>
    );
};

export default CreateProjectFormWithPreview;