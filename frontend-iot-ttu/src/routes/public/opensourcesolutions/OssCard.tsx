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

    const {t} = useTranslation();


    const {register, handleSubmit, formState: {errors}} =
        useForm({resolver: yupResolver(schema)})

    const service = new OpenSourceSolutionService();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(true);


    const onSubmit = (fieldValues: FieldValues) => {
        let data: IRequestOSSAccess = {solutionId: solution.id, email: fieldValues.email};
        service.getAccess(data).then(res => {
            setMessage("Check your inbox!")
            setSuccessful(true);
        }).catch(e => {
            setMessage("Oops, something went wrong :(")
            setSuccessful(false);
        })
    }


    return <Col md={6}>
        <div className={"p-2"}>
            <div className={"oss-card notification d-flex w-100"}
            >
                <div className={"notiglow"}></div>
                <div className="notiborderglow"></div>
                <h3 className="notititle header-purple">{
                    <Show>
                        <Show.When isTrue={solution.private}>
                            <img className={"lock"} alt={"Private"} src={lock}/>
                        </Show.When>
                        <Show.Else>
                            <img className={"lock"} alt={"Public"} src={unlock}/>
                        </Show.Else>
                    </Show>
                }{solution.title}
                </h3>
                <div className="notibody d-flex flex-column mt-0 align-items-start"
                     style={{flexGrow: 1}}
                >
                    <p className={"mt-1"}>{solution.body}</p>

                    <div className={"to-bottom mb-2 w-100"}>

                        <Show>

                            <Show.When isTrue={solution.private}>
                                <ButtonPrimary onClick={() => {
                                    setSubmitMode(true)
                                }}>Get access</ButtonPrimary>
                            </Show.When>
                            <Show.When isTrue={submitMode}>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <InputControl type={"text"} error={errors.email?.message} register={register}
                                                  name={'email'} label={t(`oss.emailToGet`)}/>
                                    <div className={"d-flex"}>
                                        <ButtonPrimary
                                            className="btn_custom_out mt-2 align-self-center" type={"button"}
                                            onClick={handleSubmit(onSubmit)}>
                                            {t('common.submit')}
                                        </ButtonPrimary>
                                        <ButtonPrimary className="btn_custom_out mt-2 mx-2 align-self-center"
                                                       onClick={() => {
                                                           setSubmitMode(false)
                                                       }}>Cancel</ButtonPrimary>
                                    </div>
                                </Form>

                            </Show.When>
                            <Show.Else>
                                <ButtonPrimary onClick={goToLink}>Go to repository</ButtonPrimary>
                            </Show.Else>
                        </Show>
                    </div>
                </div>
            </div>
        </div>
    </Col>
}

interface IRequestProps {
    solutionId: string
}

const RequestAccess = (props: IRequestProps) => {
    const service = new OpenSourceSolutionService();
    const {t} = useTranslation();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(true);

    const schema = yup.object().shape({
        email: yup.string().email().required()
    })

    const onSubmit = (fieldValues: FieldValues) => {
        let data: IRequestOSSAccess = {solutionId: props.solutionId, email: fieldValues.email};
        service.getAccess(data).then(res => {
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