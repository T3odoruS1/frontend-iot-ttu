import PageTitle from "../../../../components/common/PageTitle";
import * as yup from "yup";
import {ContactPersonService} from "../../../../services/ContactPersonService";
import {FieldValues, useForm} from "react-hook-form";
import {IContactPersonOutput} from "../../../../dto/contact/people/IContactPersonOutput";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Col, Form, Row} from "react-bootstrap";
import InputControl from "../../../../components/form/InputControl";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import i18n from "i18next";
import {SuccessAlert} from "../../../../components/lottie/SuccessAlert";
import ReactQuill from "react-quill";
import {reducedFormats, reducedModules} from "../../../../configs/configurations";
import LayoutDefault from "../../../../components/structure/LayoutDefault";

const schema = yup.object().shape({
    id: yup.string().uuid().nullable(),
    name: yup.string().trim().required(),
    body: yup.array().length(2).of(yup.object().shape({
        value: yup.string().trim()
            .notOneOf(["<p><br></p>"], "admin.news.adminNews.create.validation.fieldIsRequired")
            .required(),
        culture: yup.string().required()
    })).required()
})

const ContactPersonCreate = () => {
    const service = new ContactPersonService();
    const {t} = useTranslation();
    const [errorResponse, setErrorResponse] = useState("");
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const {id} = useParams();
    const [pending, setPending] = useState(false);

    const onSuccess = () => {
        setSuccess(true);
        setPending(false);
        setTimeout(() => {
            setSuccess(false);
            navigate(`/${i18n.language}/admin/contact`);
        }, 1000)
    }

    const onSubmit = (fieldValues: FieldValues) => {
        setErrorResponse("")
        setPending(true)
        if (fieldValues.id === undefined) {
            service.create(fieldValues as IContactPersonOutput).then(() => {
                onSuccess();
            }).catch((err) => {
                setErrorResponse(err.message);
            })
        } else {
            service.update(fieldValues as IContactPersonOutput).then(() => {
                onSuccess();
            }).catch((err) => {
                setErrorResponse(err.message);
            })
        }

    }


    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
    } =
        useForm<IContactPersonOutput>({resolver: yupResolver(schema)});

    const setLangs = () => {
        setValue(`body.0.culture`, "en");
        setValue(`body.1.culture`, "et");
    }

    useEffect(() => {
        setLangs();
    }, []);

    useEffect(() => {
        setLangs();
        if (id !== undefined) {
            service.getPreview(id).then(res => {
                setValue(`id`, res.id);
                setValue(`name`, res.name);
                onEditorStateChangeEng(res.body.find(b => b.culture === "en")?.value!);
                onEditorStateChangeEst(res.body.find(b => b.culture === "et")?.value!);
            })
        }
    }, [id]);

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

    return (
        <>
            <LayoutDefault headerContent={
                <PageTitle>{t(`contact.createPerson`)}</PageTitle>

            } bodyContent={
                <Form onSubmit={handleSubmit(onSubmit)}>
                {success && <SuccessAlert/>}
                {errorResponse && <p className={"text-danger"}>{errorResponse}</p>}
                <div className={"mt-2"}>
                    <InputControl type={"text"} error={errors.name?.message} register={register}
                                  name={'name'} label={t(`contact.personName`)}/>
                </div>


                <Row>
                    <Col>
                        <div className={"contact-person-editor"}>
                            <p className="mt-5">
                                {t("contact.contactInfoEng")}
                            </p>
                            <ReactQuill
                                theme="snow"
                                value={editorHtmlEng}
                                onChange={onEditorStateChangeEng}
                                modules={reducedModules}
                                formats={reducedFormats}
                            />

                        </div>
                    </Col>
                    <Col>
                        <div className={'contact-person-editor'}>
                            <p className="mt-5">
                                {t("contact.contactInfoEst")}
                            </p>
                            <ReactQuill
                                theme="snow"
                                value={editorHtmlEst}
                                onChange={onEditorStateChangeEst}
                                modules={reducedModules}
                                formats={reducedFormats}
                            />
                        </div>
                    </Col>
                </Row>

                <ButtonPrimary
                    className="btn_custom_out mt-5 w-25 align-self-center" type={"button"}
                    onClick={handleSubmit(onSubmit)}>
                    {t('common.submit')}
                </ButtonPrimary>


            </Form>}/>

        </>
    )
        ;
};

export default ContactPersonCreate;