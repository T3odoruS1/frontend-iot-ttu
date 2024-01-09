import {useForm, FieldValues} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {FormCheck, FormFloating} from "react-bootstrap";
import NewsForm from "./NewsForm";
import {INewsOutputDTO} from "../../../../dto/news/INewsOutputDTO";
import ContentPreview from "../../../../components/ContentPreview";
import PageTitle from "../../../../components/common/PageTitle";
import useTranslatedTopicAreas from "../../../../hooks/useTranslatedTopicAreas";
import {useNavigate, useParams} from "react-router-dom";
import {NewsService} from "../../../../services/NewsService";
import {INewsWTranslations} from "../../../../dto/news/INewsWTranslations";

interface IProps {
    onSubmit: (event: FieldValues) => void;
}



const NewsCreateFormWithPreview = (props: IProps) => {
    const {t} = useTranslation();
    const schema = yup.object().shape({
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
        image: yup.string().required(`admin.news.adminNews.create.validation.imageRequired`),
        author: yup
            .string()
            .min(1, `admin.news.adminNews.create.validation.AuthorNameLen`)
            .required(),
        topicAreas: yup
            .array(
                yup.object().shape({
                    id: yup.string().uuid(`admin.news.adminNews.create.validation.topicAreaMandatory`).required(),
                })
            )
            .required(`admin.news.adminNews.create.validation.topicAreaMandatory`)
            .min(1, `admin.news.adminNews.create.validation.topicAreaMandatory`)
    });
    const [editorHtmlEng, setEditorHtmlEng] = useState<string>("");
    const [editorHtmlEst, setEditorHtmlEst] = useState<string>("");
    const [preview, setPreview] = useState<boolean>(false);
    const {topicAreas, pending} = useTranslatedTopicAreas();
    const newsService = new NewsService();
    const {id} = useParams();
    const navigate = useNavigate();

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<INewsOutputDTO>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (id !== undefined) {
            newsService.getMultiLang(id).then(res => {
                if (res !== undefined && "body" in res) {
                    console.log(res);
                    setFormValues(res);
                }
            })
        }
    }, []);


    const setFormValues = (news: INewsWTranslations) => {
        onEditorStateChangeEng(news!.body.find(b => {
            return b.culture === "en"
        })?.value ?? "");
        onEditorStateChangeEst(news!.body.find(b => {
            return b.culture === "et"
        })?.value ?? "");
    }


    const onEditorStateChangeEng = (html: string) => {
        // console.log(html)
        setValue(`body.${0}.value`, html);
        setEditorHtmlEng(html);
        console.log(errors?.image?.message?.toString())
    };

    const onEditorStateChangeEst = (html: string) => {
        setValue(`body.${1}.value`, html);
        setEditorHtmlEst(html);
    };
        const onSubmit = (formValues: FieldValues) => {
            props.onSubmit(formValues);
            navigate("./")
        }

    return (
        <>
            <div className="">
                <PageTitle>{t("admin.news.adminNews.create.createNewPost")}</PageTitle>
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
                <NewsForm
                    control={control}
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onEditorStateChangeEng={onEditorStateChangeEng}
                    onEditorChangeEst={onEditorStateChangeEst}
                    editorHtmlEng={editorHtmlEng}
                    editorHtmlEst={editorHtmlEst}
                    onSubmit={onSubmit}
                    setValue={setValue}
                    getValues={getValues}
                />
            </div>
            <div style={{display: preview ? "block" : "none"}}>
                <ContentPreview topicAreas={topicAreas ?? []} formValues={getValues()}/>
            </div>
        </>
    );
};

export default NewsCreateFormWithPreview;
