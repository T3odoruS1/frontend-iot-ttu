import PageTitle from "../../../components/common/PageTitle";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import InputControl from "../../../components/form/InputControl";
import ReactQuill from "react-quill";
import {FieldValues, useForm} from "react-hook-form";
import {IPageContentMultilang} from "../../../dto/pageContent/IPageContentMultilang";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect, useState} from "react";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {formats, modules} from "../../../configs/configurations";
import {useTranslation} from "react-i18next";
import {SuccessAlert} from "../../../components/lottie/SuccessAlert";
import {PageContentService} from "../../../services/PageContentService";
import useFetch from "../../../hooks/useFetch";
import {FormFloating, FormLabel, FormSelect} from "react-bootstrap";
import LayoutNoHeader from "../../../components/structure/LayoutNoHeader";
import ButtonContent from "../../../components/common/ButtonContent";

interface IProps {
    pageIdentifier: string;
}


const schema = yup.object().shape({
    pageIdentifier: yup.string().required(),
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
                value: yup.string().trim()
                    .notOneOf(["<p><br></p>"], "admin.news.adminNews.create.validation.fieldIsRequired")
                    .min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
                culture: yup.string().min(1, "").required(),
            })
        )
        .required(),
})


export const EditablePageEditor = (props: IProps) => {

    const service = new PageContentService();

    const {data: pageContent, pending, error} =
        useFetch<IPageContentMultilang>(service.getMultilang, [props.pageIdentifier]);


    const [exists, setExists] = useState(true)
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(false);
    const [editorHtmlEng, setEditorHtmlEng] = useState<string>("");
    const [editorHtmlEst, setEditorHtmlEst] = useState<string>("");
    const {t} = useTranslation();


    const {
        register,
        setValue,
        handleSubmit,
        getValues,
        trigger,
        formState: {errors}
    } = useForm<IPageContentMultilang>({resolver: yupResolver(schema)})


    useEffect(() => {
        if (pageContent) {
            setExists(true);
            setValue("pageIdentifier", pageContent.pageIdentifier)

            onEditorStateChangeEng(pageContent.body.find(b => b.culture === "en")?.value ?? "")

            onEditorStateChangeEst(pageContent.body.find(b => b.culture === "et")?.value ?? "")

            setValue(`title.${0}.value`, pageContent.title.find(b => b.culture === "en")?.value ?? "")
            setValue(`title.${1}.value`, pageContent.title.find(b => b.culture === "et")?.value ?? "")

        } else if (error) {
            setValue("pageIdentifier", props.pageIdentifier)
            setExists(false)
        }
        setCultures();
    }, [pending]);

    const setCultures = () => {
        setValue(`title.${0}.culture`, "en");
        setValue(`title.${1}.culture`, "et");
        setValue(`body.${0}.culture`, "en");
        setValue(`body.${1}.culture`, "et");
    }

    const [pendingUpload, setPendingUpload] = useState(false);

    const upload = async (fieldValues: FieldValues) => {
        setPendingUpload(true);
        if (!exists) {
            service.create(fieldValues as IPageContentMultilang).then(response => {
                if (response.pageIdentifier !== undefined) {
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 1000)
                } else {
                    setMessage("Something went wrong");
                }
            }).finally(() => setPendingUpload(false))
        } else {
            console.log(fieldValues)
            service.update(fieldValues as IPageContentMultilang).then(response => {
                setSuccess(true);
                let element = document.getElementById("success");
                element?.scrollIntoView();
                setTimeout(() => {
                    setSuccess(false);
                }, 1000)
            }).catch(e => setMessage("Something went wrong"))
                .finally(() => setPendingUpload(false))
        }
    }

    const onEditorStateChangeEng = (html: string) => {
        setValue(`body.${0}.value`, html);
        setEditorHtmlEng(html);
    };

    const onEditorStateChangeEst = (html: string) => {
        setValue(`body.${1}.value`, html);
        setEditorHtmlEst(html);
    };

    const [editorLanguage, setEditorLanguage] = useState("EN");

    useEffect(() => {
        console.log(errors);
    }, [editorLanguage]);


    return (
        <LayoutNoHeader bodyContent={success && <SuccessAlert /> || <><PageTitle>{t("common.forPage")} {props.pageIdentifier}</PageTitle>
            <p>{message}</p>
            <form onSubmit={
                handleSubmit((dto) => {
                    upload(dto);
                }, (errors) => console.log(errors))
            }>
                <SubHeadingPurple>{t("common.titles")}</SubHeadingPurple>
                <div className={"mt-2"}>
                    <InputControl
                        error={t(errors.title?.[0]?.value?.message?.toString())}
                        register={register}
                        name={`title.${0}.value`}
                        type={"text"}
                        label={t("pageContent.titleEng")}
                    />
                </div>
                <div className={"mt-2 mb-2"}>
                    <InputControl
                        register={register}
                        error={t(errors.title?.[1]?.value?.message?.toString())}
                        name={`title.${1}.value`}
                        label={t("pageContent.titleEng")}
                    />
                </div>
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
                        onChange={onEditorStateChangeEst}
                        modules={modules}
                        formats={formats}
                    />
                </div>
                <div className={"my-2"}>
                    <ButtonPrimary type={"submit"}>
                        <ButtonContent isLoading={pendingUpload} content={t("common.submit")}/>
                    </ButtonPrimary>
                </div>
            </form>
        </>}/>
    );
};