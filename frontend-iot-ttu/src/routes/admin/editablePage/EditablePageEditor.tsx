import PageTitle from "../../../components/common/PageTitle";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import InputControl from "../../../components/form/InputControl";
import ReactQuill from "react-quill";
import {FieldValues, useForm, useFormContext} from "react-hook-form";
import {dummyPage} from "../../../assets/loremIpsumDummy";
import {IPageContentMultilang} from "../../../dto/pageContent/IPageContentMultilang";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import useTranslatedPageContent from "../../../hooks/useTranslatedPageContent";
import React, {useEffect, useState} from "react";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {formats, modules} from "../../../configs/configurations";
import {useTranslation} from "react-i18next";
import {log} from "node:util";

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
                value: yup.string().min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
                culture: yup.string().min(1, "").required(),
            })
        )
        .required(),
})


export const EditablePageEditor = (props: IProps) => {

    const {pageContent, pending, error, service} =
        useTranslatedPageContent(props.pageIdentifier);
    // useTranslatedPageContent("TEST");

    const [exists, setExists] = useState(true)

    const [editorHtmlEng, setEditorHtmlEng] = useState<string>("");
    const [editorHtmlEst, setEditorHtmlEst] = useState<string>("");

    const {
        register,
        setValue,
        handleSubmit,
        getValues,
        trigger,
        formState: {errors}
    } = useForm<IPageContentMultilang>({resolver: yupResolver(schema)})

    const [message, setMessage] = useState("")

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

    const upload = async (fieldValues: FieldValues) => {
        if (!exists) {
            service.create(fieldValues as IPageContentMultilang).then(response => {
                if (response.pageIdentifier !== undefined) {
                    setMessage("Successfully uploaded");
                } else {
                    setMessage("Shit has hit the fan");
                }
            })
        } else {
            console.log(fieldValues)
            service.update(fieldValues as IPageContentMultilang).then(response => {
                setMessage("Successfully uploaded");
            })
                .catch(e => setMessage("Something went wrong"))
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

    const {t} = useTranslation();

    return (
        <><PageTitle>For page: {props.pageIdentifier}</PageTitle>
            <p>{message}</p>
            <form onSubmit={
                handleSubmit((dto) => {
                    upload(dto);
                }, (errors) => console.log(errors))
            }>
                <SubHeadingPurple>Titles</SubHeadingPurple>
                <div className={"mt-2"}>
                    <InputControl
                        error={t(errors.title?.[0]?.value?.message?.toString())}
                        register={register}
                        name={`title.${0}.value`}
                        type={"text"}
                        label={"Title english"}
                    />
                </div>
                <div className={"mt-2"}>
                    <InputControl
                        register={register}
                        error={t(errors.title?.[1]?.value?.message?.toString())}
                        name={`title.${1}.value`}
                        label={"Title estonian"}
                    />
                </div>

                <SubHeadingPurple className="mt-5">
                    {t("admin.news.adminNews.create.contentEng")}
                </SubHeadingPurple>
                <p>{errors.body?.[0]?.value?.message?.toString()}</p>
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
                <p>{errors.body?.[1]?.value?.message?.toString()}</p>
                <ReactQuill
                    theme="snow"
                    value={editorHtmlEst}
                    onChange={onEditorStateChangeEst}
                    modules={modules}
                    formats={formats}
                />
                <div className={"my-2"}>
                    <ButtonPrimary type={"submit"}>
                        Submit
                    </ButtonPrimary>
                </div>
            </form>
        </>
    );
};