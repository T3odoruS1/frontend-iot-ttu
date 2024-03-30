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
import {Form, Tab, Table} from "react-bootstrap";
import InputControl from "../../../components/form/InputControl";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import Show from "../../../components/common/Show";
import {SuccessAlert} from "../../../components/lottie/SuccessAlert";
import removeIcon from "../../../assets/iconpack/delete.svg"
import addPersonIcon from "../../../assets/iconpack/addUser.svg"
import edit from "../../../assets/iconpack/edit.svg"
import SubHeadingPurple from "../../../components/common/SubheadingPurple";


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

            <SubHeadingPurple>Contact us page email recepients: </SubHeadingPurple>

            <Popup content={<AddRecepientElement onSubmit={onSubmit}/>} cname={"icon-wrapper-lg"}
                   trigger={<img className={"icon-wrapper-lg"}
                                 alt={"Delete"}
                                 src={addPersonIcon}/>}/>
            <span className={"text-success"}>{message}</span>

            <div className={"mt-2"}>
                <Table className={"w-25"} variant={"striped"}>
                    <tbody>
                    {recepients?.map((rec, index) => {
                        return <tr className={""}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {rec.email}
                            </td>
                            <td>
                                <ActionConfirmationAlert action={() => {
                                    removeRecepient(rec.id)
                                }}
                                                         displayText={"Are you sure you want to delete this recepient?"}
                                                         triggerElement={<img className={"icon"}
                                                                              alt={"Delete"}
                                                                              src={removeIcon}/>
                                                         }/>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </div>
            <hr/>

            <SubHeadingPurple>{t('contact.listTitle')}</SubHeadingPurple>
            <img onClick={toCreate}
                 className={"icon-wrapper-lg"}
                 alt={"Delete"}
                 src={addPersonIcon}/>

            <Table variant={"striped"} className={"w-50"}>

                <tbody>
                {people?.map(person => {
                    return <tr>
                        <td className={''}>

                            <ContactPerson name={person.name} body={person.body}/>
                        </td>
                        <td>
                            <div className={"d-flex"}>

                                <div className={"mx-2"}><img onClick={() => {
                                    toUpdate(person.id)
                                }} className={"icon icon-wrapper"}
                                                            alt={"Delete"}
                                                            src={edit}/>
                                </div>
                                <div className={"mx-2"}>
                                    <ActionConfirmationAlert action={() => {
                                        remove(person.id)
                                    }} displayText={t("common.deleteUSure")}
                                                             triggerElement={<img className={"icon icon-wrapper"}
                                                                                  alt={"Delete"}
                                                                                  src={removeIcon}/>}/>
                                </div>
                            </div>
                        </td>
                    </tr>


                })}
                </tbody>
            </Table>

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
