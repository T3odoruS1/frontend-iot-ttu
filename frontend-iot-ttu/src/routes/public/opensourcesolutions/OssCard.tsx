import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Col, Form} from "react-bootstrap";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import Show from "../../../components/common/Show";
import Popup from "../../../components/Popup";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {OpenSourceSolutionService} from "../../../services/OpenSourceSolutionService";
import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {IRequestOSSAccess} from "../../../dto/opensourcesolutions/IRequestOSSAccess";
import {yupResolver} from "@hookform/resolvers/yup";
import InputControl from "../../../components/form/InputControl";
import {IOpenSourceSolution} from "../../../dto/opensourcesolutions/IOpenSourceSolution";
import lock from "../../../assets/Lock icon.svg"
import unlock from "../../../assets/Lock open.svg"
import ReactGA from "react-ga4";
import ButtonContent from "../../../components/common/ButtonContent";


interface IProps {
    solution: IOpenSourceSolution
}

const schema = yup.object().shape({
    email: yup.string().email().required()
})
const OSSCard: FC<IProps> = ({solution}) => {
    const navigate = useNavigate();
    const goToLink = () => {
        window.open(solution.link, '_blank');
    }

    const [submitMode, setSubmitMode] = useState(false);

    const {t, i18n} = useTranslation();


    const {register, handleSubmit, formState: {errors}} =
        useForm({resolver: yupResolver(schema)})

    const service = new OpenSourceSolutionService();
    const [message, setMessage] = useState("");

    const [pending, setPending] = useState(false);


    const onSubmit = (fieldValues: FieldValues) => {
        let data: IRequestOSSAccess = {solutionId: solution.id, email: fieldValues.email};
        setPending(true);
        service.getAccess(data, i18n.language).then(res => {
            setMessage("Check your inbox!")

        }).catch(e => {
            setMessage("Oops, something went wrong :(")
        }).finally(() => {
            setPending(false)
        })
    }


    return <div className={"p-2 ttu-card"}>

            <div className={"d-flex"}>
                <Show>
                    <Show.When isTrue={solution.private}>
                        <img className={"lock  mt-1"} alt={"Private"} src={lock}/>
                    </Show.When>
                    <Show.Else>
                        <img className={"lock  mt-1"} alt={"Public"} src={unlock}/>
                    </Show.Else>
                </Show>
                <div className={"flex-column h-100"}>
                    <h1>
                        {solution.title}
                    </h1>
                    <div className="d-flex to-bottom oss-body flex-grow-1 flex-column mt-0 align-items-start">
                        <p className={"mt-1"}>{solution.body}</p>

                        <div className={"to-bottom mb-2 w-100"}>
                            <Show>

                                <Show.When isTrue={solution.private}>
                                    <ButtonPrimary onClick={() => {
                                        setSubmitMode(true)
                                    }}>{t("oss.getAccess")}</ButtonPrimary>
                                </Show.When>
                                <Show.When isTrue={submitMode}>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <span className={"text-dark"}>{message}</span>
                                        <InputControl type={"text"} error={errors.email?.message} register={register}
                                                      name={'email'} label={t(`oss.emailToGet`)}/>
                                        <div className={"d-flex"}>
                                            <ButtonPrimary
                                                className="btn_custom_out mt-2 align-self-center" type={"button"}
                                                onClick={handleSubmit(onSubmit)}>
                                                <ButtonContent isLoading={pending} content={t('common.submit')}/>
                                            </ButtonPrimary>
                                            <ButtonPrimary className="btn_custom_out mt-2 mx-2 align-self-center"
                                                           onClick={() => {
                                                               setSubmitMode(false)
                                                           }}>{t("common.cancel")}</ButtonPrimary>
                                        </div>
                                    </Form>

                                </Show.When>
                                <Show.Else>
                                    <ButtonPrimary onClick={goToLink}>{t("oss.gotoRepo")}</ButtonPrimary>
                                </Show.Else>
                            </Show>
                        </div>
                    </div>
                </div>
            </div>

        </div>

}

interface IRequestProps {
    solutionId: string
}

const RequestAccess = (props: IRequestProps) => {
    const service = new OpenSourceSolutionService();
    const {t, i18n} = useTranslation();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(true);

    const schema = yup.object().shape({
        email: yup.string().email().required()
    })

    const onSubmit = (fieldValues: FieldValues) => {
        let data: IRequestOSSAccess = {solutionId: props.solutionId, email: fieldValues.email};
        service.getAccess(data, i18n.language).then(res => {
            setMessage("Check your inbox!")
            setSuccessful(true);
        }).catch(e => {
            setMessage("Oops, something went wrong :(")
            setSuccessful(false);
        })
    }

    const {register, handleSubmit, formState: {errors}} =
        useForm({resolver: yupResolver(schema)})

    return <div className={"p-4"}>
        <SubHeadingPurple>Get repository link</SubHeadingPurple>
        <p>Insert your email to get access to this repository. We will send you the link to your email.</p>
        <p className={successful ? "text-success" : "test-danger"}></p>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputControl type={"text"} error={errors.email?.message} register={register}
                          name={'email'} label={t(`common.email`)}/>
            <ButtonPrimary
                className="btn_custom_out mt-5 w-25 align-self-center" type={"button"}
                onClick={handleSubmit(onSubmit)}>
                {t('common.submit')}
            </ButtonPrimary>
        </Form>
    </div>
}

export default OSSCard