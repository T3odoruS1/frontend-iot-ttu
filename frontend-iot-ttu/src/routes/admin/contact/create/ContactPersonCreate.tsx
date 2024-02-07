import PageTitle from "../../../../components/common/PageTitle";
import * as yup from "yup";
import {ContactPersonService} from "../../../../services/ContactPersonService";
import {FieldValues, useForm} from "react-hook-form";
import {IContactPersonOutput} from "../../../../dto/contact/people/IContactPersonOutput";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Col, Form, FormControl, FormFloating, FormLabel, Row} from "react-bootstrap";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import InputControl from "../../../../components/form/InputControl";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import i18n from "i18next";
import {SuccessAlert} from "../../../../components/lottie/SuccessAlert";
import ReactQuill from "react-quill";
import {formats, modules, reducedFormats, reducedModules} from "../../../../configs/configurations";

const schema = yup.object().shape({
    id: yup.string().uuid().nullable(),
    name: yup.string().required(),
    body: yup.array().length(2).of(yup.object().shape({
        value: yup.string().required(),
        culture: yup.string().required()
    })).required()
})

export const ContactPersonCreate = () => {
    const service = new ContactPersonService();
    const {t} = useTranslation();
    const [errorResponse, setErrorResponse] = useState("");
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const onSubmit = (fieldValues: FieldValues) => {
        setErrorResponse("")
        service.create(fieldValues as IContactPersonOutput).then(() => {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate(`/${i18n.language}/admin/contact`);
            }, 1000)
        }).catch((err) => {
            setErrorResponse(err.message);
        })
    }

    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
    } =
        useForm<IContactPersonOutput>({resolver: yupResolver(schema)})
    useEffect(() => {
        setValue(`body.0.culture`, "en");
        setValue(`body.1.culture`, "et");
    }, []);

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
            <PageTitle>Create contact person</PageTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {success && <SuccessAlert/>}
                {errorResponse && <p className={"text-danger"}>{errorResponse}</p>}
                <div className={"mt-2"}>
                    <InputControl type={"text"} error={errors.name?.message} register={register}
                                  name={'name'} label={"Name"}/></div>




                <Row>
                    <Col>
                        <div className={"contact-person-editor"}>
                            <p className="mt-5">
                                {t("admin.news.adminNews.create.contentEng")}
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
                                {t("admin.news.adminNews.create.contentEst")}
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
                    Submit
                </ButtonPrimary>


            </Form>
        </>
    )
        ;
};