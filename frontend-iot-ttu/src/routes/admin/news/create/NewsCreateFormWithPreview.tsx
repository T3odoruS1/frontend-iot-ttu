import {useForm, FieldValues} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {FormCheck, FormFloating} from "react-bootstrap";
import NewsForm from "./NewsForm";
import {INewsOutputDTO} from "../../../../dto/news/INewsOutputDTO";
import ContentPreview from "../../../../components/ContentPreview";
import PageTitle from "../../../../components/common/PageTitle";
import {useNavigate, useParams} from "react-router-dom";
import {NewsService} from "../../../../services/NewsService";
import {INewsWTranslations} from "../../../../dto/news/INewsWTranslations";
import ErrorPage from "../../../ErrorPage";
import {TopicAreaService} from "../../../../services/TopicAreaService";
import useFetch from "../../../../hooks/useFetch";
import {ITopicAreaGetMultilang} from "../../../../dto/topicarea/ITopicAreaGetMultilang";

interface IProps {
    onSubmit: (event: FieldValues) => void;
}


const NewsCreateFormWithPreview = (props: IProps) => {
    const backupKey = "news";
    const {t} = useTranslation();
    const schema = yup.object().shape({
        id: yup.string().nullable(),
        title: yup
            .array()
            .length(2)
            .of(
                yup.object().shape({
                    value: yup.string().trim().min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
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
                        .min(1, `admin.news.adminNews.create.validation.fieldIsRequired`)
                        .required("admin.news.adminNews.create.validation.fieldIsRequired"),
                    culture: yup.string().min(1, "").required(),
                })
            )
            .required(),
        image: yup.string().required(`admin.news.adminNews.create.validation.imageRequired`),
        author: yup
            .string()
            .trim()
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

    const [preview, setPreview] = useState<boolean>(false);
    const [unavailable, setUnavailable] = useState(false);
    const newsService = new NewsService();
    const topicAreaService = new TopicAreaService();
    const {data: topicAreas, pending, error} =
        useFetch<ITopicAreaGetMultilang[]>(topicAreaService.getWithTranslations);
    const navigate = useNavigate();
    const {id} = useParams();


    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        control,
        watch,
        reset,
        setFocus,
        formState: {errors},
    } = useForm<INewsOutputDTO>({
        resolver: yupResolver(schema), defaultValues: {
            topicAreas: [
                {
                    id: ""
                }
            ]
        }
    });
    const setFormValues = (news: INewsWTranslations) => {
        if(news === undefined) return;
        const defaultValues = {
            topicAreas: news.topicAreas?.map(area => ({ id: area.id })),
            title: news.title,
            image: news.image,
            author: news.author,
            id: news.id,
            body: news.body
        };
        reset(defaultValues);

        setEditorHtmlEng(news!.body?.find(b => {
            return b.culture === "en"
        })?.value ?? "");
        setEditorHtmlEst(news!.body?.find(b => {
            return b.culture === "et"
        })?.value ?? "");
    };



    useEffect(() => {

        if (id !== undefined) {
            newsService.getMultiLang(id).then(res => {
                console.log("res")
                if (res !== undefined && "body" in res) {
                    console.log(res);
                    setFormValues(res);
                }
            }).catch((e) => {
                    console.log("e")
                    setUnavailable(true)
                }
            )
        }
        if (error || unavailable) {
            navigate("/error")
        }


    }, []);

    const onSubmit = (formValues: FieldValues) => {
        props.onSubmit(formValues);
        navigate("./")
    }



    const [editorHtmlEng, setEditorHtmlEng] = useState<string>("");
    const [editorHtmlEst, setEditorHtmlEst] = useState<string>("");

    const onEditorStateChangeEng = (html: string) => {
        setValue(`body.${0}.value`, html);
        setEditorHtmlEng(html);
    };

    const onEditorStateChangeEst = (html: string) => {
        setValue(`body.${1}.value`, html);
        setEditorHtmlEst(html);
    };


    if (error || unavailable) {
        return <ErrorPage/>
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
                    setFocus={setFocus}
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
