import { useEffect, useState } from "react";
import PageTitle from "../../../../components/common/PageTitle";
import { FeedService } from "../../../../services/FeedService";
import { EFeedPage } from "../../../../dto/feedpage/EFeedPage";
import { Form, FormFloating, FormLabel, FormSelect } from "react-bootstrap";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { IFeedPageCategoryOutput } from "../../../../dto/feedpage/category/IFeedPageCategoryOutput";
import { yupResolver } from "@hookform/resolvers/yup";
import InputControl from "../../../../components/form/InputControl";
import { useTranslation } from "react-i18next";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { SuccessAlert } from "../../../../components/lottie/SuccessAlert";
import { Loader } from "../../../../components/Loader";
import LayoutNoHeader from "../../../../components/structure/LayoutNoHeader";

const schema = yup.object().shape({
    id: yup.string().uuid().nullable(),
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
    feedPageIdentifier: yup.string().required(`admin.news.adminNews.create.validation.fieldIsRequired`)
})

const FeedPageCategoryCreate = () => {

    const { t } = useTranslation();
    const service = new FeedService();
    const [page, setPage] = useState(EFeedPage.HARDWARE.toString());
    const [success, setSuccess] = useState(false);
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    const onPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Event target: ", event.target.value);
        setPage(event.target.value);
    }

    const { register, setValue, handleSubmit, formState: { errors } } =
        useForm<IFeedPageCategoryOutput>({ resolver: yupResolver(schema) });

    useEffect(() => {
        setValue(`title.${0}.culture`, "en");
        setValue(`title.${1}.culture`, "et");
    }, [])

    useEffect(() => {
        setValue(`feedPageIdentifier`, page);
    }, [page]);

    const onSubmit = (fieldValues: FieldValues) => {
        setPending(true);
        service.createCategory(fieldValues as IFeedPageCategoryOutput).then(res => {
            setSuccess(true);
            setPending(false);
            setTimeout(() => {
                setSuccess(false);
                navigate("../")
            }, 1000)
        }).catch(e => {
            alert(e);
        }).finally(
            () => setPending(false)
        )
    }

    return <LayoutNoHeader bodyContent={<>
        <PageTitle>Feed page category create</PageTitle>
        {pending && <Loader />}
        {success && <SuccessAlert />}
        <FormFloating>
            <FormSelect className="no-br" id="page-choice" value={page} onChange={onPageChange}>
                <option value={EFeedPage.HARDWARE}>{EFeedPage.HARDWARE}</option>
                <option value={EFeedPage.RESEARCH}>{EFeedPage.RESEARCH}</option>
            </FormSelect>
            <FormLabel htmlFor="page-choice">Choose a page for which to create a category</FormLabel>
        </FormFloating>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className={"mt-2"}>
                <InputControl
                    name={`title.${0}.value`}
                    register={register}
                    type="text"
                    error={t(errors.title?.[0]?.value?.message!)}
                    label={t("projects.titleEng")}
                />
            </div>

            <div className={"mt-2"}>
                <InputControl
                    name={`title.${1}.value`}
                    register={register}
                    type="text"
                    error={t(errors.title?.[1]?.value?.message!)}
                    label={t("projects.titleEst")}
                />
            </div>
            <ButtonPrimary className="mt-5" type="submit">
                {t("admin.news.adminNews.create.create")}
            </ButtonPrimary>
        </Form>
    </>}/>
}

export default FeedPageCategoryCreate;