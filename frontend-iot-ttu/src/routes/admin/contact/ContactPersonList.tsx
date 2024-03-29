import PageTitle from "../../../components/common/PageTitle";
import useFetch from "../../../hooks/useFetch";
import {IContactPerson} from "../../../dto/contact/people/IContactPerson";
import {ContactPersonService} from "../../../services/ContactPersonService";
import i18n from "i18next";
import {useNavigate} from "react-router-dom";
import {ContactPerson} from "../../../components/ContactPerson";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import React, {useState} from "react";
import ActionConfirmationAlert from "../../../components/common/ActionConfirmationAlert";
import {useTranslation} from "react-i18next";
import {IEmailRecepient} from "../../../dto/recepient/IEmailRecepient";
import {EmailRecepientService} from "../../../services/EmailRecepientService";
import Popup from "../../../components/Popup";
import * as yup from "yup"
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IEmailRecepientOutput} from "../../../dto/recepient/IEmailRecepientOutput";
import {Form} from "react-bootstrap";
import InputControl from "../../../components/form/InputControl";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import Show from "../../../components/common/Show";
import {SuccessAlert} from "../../../components/lottie/SuccessAlert";

const ContactPersonList = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const service = new ContactPersonService();
    const recepientService = new EmailRecepientService();
    const {data: people, pending, setData, error} =
        useFetch<IContactPerson[]>(service.getAll, [i18n.language]);
    const [message, setMessage] = useState("");

    const {
        data: recepients,
        pending: recepientsPending,
        setData: setRecepients,
        error: recepientsError,
        fetchData: fetchRecepients
    } =
        useFetch<IEmailRecepient[]>(recepientService.getAll)

    const toCreate = () => {
        navigate("./create");
    }

    const toUpdate = (id: string) => {
        navigate(`./create/${id}`);
    }

    const remove = (id: string) => {
        service.delete(id).then(res => {
            let filtered = people!.filter(function (obj) {
                return obj.id !== id;
            });
            setData(filtered);
        }).catch(() => {
            alert("Something went wrong");
        });
    }

    const removeRecepient = (id: string) => {
        recepientService.delete(id).then((res) => {
            fetchRecepients();
            setMessage("Recepient deleted")
        }).catch(() => {
            alert("Something went wrong");
        })
    }

    const onSubmit = (fieldValues: IEmailRecepientOutput) => {
        recepientService.create(fieldValues).then((res) => {
            fetchRecepients();
            setMessage("Recepient added")
        }).catch(() => {
            alert("Something went wrong");
        });
    }

    return (
        <>

            <PageTitle>Contact us page email recepients: </PageTitle>

            <Popup content={<AddRecepientElement onSubmit={onSubmit}/>} trigger={<ButtonSmaller>Add</ButtonSmaller>}/>
            <span className={"text-success"}>{message}</span>

            <div className={""}>
                {recepients?.map((rec, index) => {
                    return <div className={" mt-2"}>
                        {index + 1}) {rec.email}
                        <span className={"m-4"}>
                    <ActionConfirmationAlert action={() => {
                        removeRecepient(rec.id)
                    }}
                                             displayText={"Are you sure you want to delete this recepient?"}
                                             buttonText={"Delete"}/>
                    </span>
                    </div>
                })}
            </div>
            <hr/>

            <PageTitle>{t('contact.listTitle')}</PageTitle>
            <ButtonSmaller onClick={toCreate}>{t("common.new")}</ButtonSmaller>
            <div className={"my-5"}>{people?.map(person => {
                return <div>
                    <div className={''}>
                        <ActionConfirmationAlert action={() => {
                            remove(person.id)
                        }} displayText={t("common.deleteUSure")}
                                                 buttonText={t("common.delete")}/>
                        <ButtonSmaller onClick={() => {
                            toUpdate(person.id)
                        }} className={"h-25 m-2 mb-5"}>{t("common.update")}</ButtonSmaller>
                        <ContactPerson name={person.name} body={person.body}/>


                    </div>
                    <hr/>
                </div>

            })}
            </div>

        </>
    );
};

export default ContactPersonList;

const schema = yup.object().shape({
    email: yup.string().email().required("")
})

interface IProps {
    onSubmit: (fieldValues: IEmailRecepientOutput) => void
}

const AddRecepientElement = (props: IProps) => {
    const service = new EmailRecepientService();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IEmailRecepientOutput>({resolver: yupResolver(schema)});
    const {t} = useTranslation();


    return <Form className={"m-4"} onSubmit={handleSubmit(props.onSubmit)}>
                <div className={"mt-2"}>
                    <InputControl
                        name={`email`}
                        register={register}
                        type="text"
                        error={errors.email?.message}
                        label={"E-mail"}
                    />
                </div>
                <ButtonPrimary className="mt-2" type="submit">
                    {t("admin.news.adminNews.create.create")}
                </ButtonPrimary>
            </Form>

}
