import React, {FC, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { EFeedPage } from "../../../../dto/feedpage/EFeedPage";
import { FeedService } from "../../../../services/FeedService";
import { Form, FormFloating, FormLabel, FormSelect } from "react-bootstrap";
import {
    FieldErrors,
    FieldValues,
    set,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import { IFeedPagePostOutput } from "../../../../dto/feedpage/post/IFeedPagePostOutput";
import InputControl from "../../../../components/form/InputControl";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../../configs/configurations";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import useFetch from "../../../../hooks/useFetch";
import { IFeedPageCategory } from "../../../../dto/feedpage/category/IFeedPageCategory";
import i18n from "i18next";
import { Loader } from "../../../../components/Loader";
import {useParams} from "react-router-dom";
import {UseFormWatch} from "react-hook-form/dist/types/form";

interface IProps {
    handleSubmit: UseFormHandleSubmit<IFeedPagePostOutput, undefined>;
    register: UseFormRegister<IFeedPagePostOutput>;
    setValue: UseFormSetValue<IFeedPagePostOutput>;
    errors: FieldErrors<IFeedPagePostOutput>;
    getValues: UseFormGetValues<IFeedPagePostOutput>;
    onSubmit: (fieldValues: FieldValues) => void;
    watch: UseFormWatch<IFeedPagePostOutput>
}

const FeedPagePostForm: FC<IProps> = ({ handleSubmit, register, setValue, errors, getValues, onSubmit, watch }) => {

    const {id} = useParams();
    const { t } = useTranslation();
    const [page, setPage] = useState(EFeedPage.HARDWARE.toString());

    const service = new FeedService();

    const [editorHtmlEng, setEditorHtmlEng] = useState(getValues("body.0.value"));
    const [editorHtmlEst, setEditorHtmlEst] = useState(getValues("body.1.value"));

    const watchedField = watch("page")
    const onEditorStateChangeEng = (html: string) => {
        setValue(`body.${0}.value`, html);
        setEditorHtmlEng(html);
    };

    const onEditorStateChangeEst = (html: string) => {
        setValue(`body.${1}.value`, html);
        setEditorHtmlEst(html);
    };

    const onPageChange = (page: string) => {
        setPage(page);
    }

    const { data: categories, pending, error } =
        useFetch<IFeedPageCategory[]>(service.getCategories, [i18n.language, page]);

    const [editorLanguage, setEditorLanguage] = useState("EN");

    const setCategoryAndPage = (categoryId: string) => {
        let pageIsSet = false;
        service.getCategories(i18n.language, EFeedPage.HARDWARE).then(result => {
            if(result.some(category => category.id === categoryId)){
                setPage(EFeedPage.HARDWARE)
                setValue("page", EFeedPage.HARDWARE)
                setTimeout(() => {
                    setValue(`feedPageCategoryId`, categoryId);
                }, 1000)
                pageIsSet = true;
            }
        })
        if(!pageIsSet){
            service.getCategories(i18n.language, EFeedPage.RESEARCH).then(result => {
                if(result.some(category => category.id === categoryId)){
                    setPage(EFeedPage.RESEARCH)
                    setValue("page", EFeedPage.RESEARCH)
                    setTimeout(() => {
                        setValue(`feedPageCategoryId`, categoryId);
                    }, 1000)
                    pageIsSet = true;
                }
            })
        }
    }

    useEffect(() => {
        if(id !== undefined){
            service.getPostMultilang(id).then(resp => {
                setTimeout(() => {
                    setCategoryAndPage(resp.feedPageCategoryId)
                }, 1000)

                setValue(`id`, resp.id);
                onEditorStateChangeEng(resp!.body.find(b => {
                    return b.culture === "en"
                })?.value ?? "");
                onEditorStateChangeEst(resp!.body.find(b => {
                    return b.culture === "et"
                })?.value ?? "");

                setValue(`title.0.value`, resp!.title!.find(t => {
                    return t.culture === "en"
                })?.value ?? "");

                setValue(`title.1.value`, resp!.title!.find(t => {
                    return t.culture === "et"
                })?.value ?? "");
            })
        }
    }, [id]);

    useEffect(() => {
        onPageChange(getValues("page") ?? EFeedPage.HARDWARE)
    }, [watchedField]);


   
    return <>
        {pending && <Loader/>}
        <FormFloating>
            <FormSelect className="no-br" id="page-choice" {...register('page')}>
                <option value={EFeedPage.HARDWARE}>{EFeedPage.HARDWARE}</option>
                <option value={EFeedPage.RESEARCH}>{EFeedPage.RESEARCH}</option>
            </FormSelect>
            <FormLabel htmlFor="page-choice">{t("feedPage.choosePage")}</FormLabel>
        </FormFloating>

        <Form onSubmit={handleSubmit(onSubmit)}>

            <div className="mt-2">
                <FormFloating>
                    <FormSelect className="no-br" id="category-choice" {...register("feedPageCategoryId")}>
                        <option></option>
                        {categories?.map(category => {
                            return <option key={category.id} value={category.id}>{category.title}</option>
                        })}
                    </FormSelect>
                    <FormLabel htmlFor="category-choice">
                        {t("feedPage.chooseCategory")} {<span className="text-danger">{t(errors.feedPageCategoryId?.message)}</span>}
                    </FormLabel>
                </FormFloating>
            </div>

            <div className="mt-2">
                <InputControl
                    name={`title.${0}.value`}
                    register={register}
                    type="text"
                    error={t(errors.title?.[0]?.value?.message!)}
                    label={t("admin.news.adminNews.create.titleInEnglish")}
                />
            </div>
            <div className="mt-2">
                <InputControl
                    name={`title.${1}.value`}
                    register={register}
                    type="text"
                    error={t(errors.title?.[1]?.value?.message!)}
                    label={t("admin.news.adminNews.create.titleInEstonian")}
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
                    onChange={onEditorStateChangeEst}
                    modules={modules}
                    formats={formats}
                />
            </div>
            <ButtonPrimary className="mt-5" type="submit">
                {t("admin.news.adminNews.create.create")}
            </ButtonPrimary>

        </Form>

    </>
}

export default FeedPagePostForm;