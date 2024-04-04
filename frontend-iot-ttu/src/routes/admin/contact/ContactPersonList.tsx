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
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IEmailRecepientOutput} from "../../../dto/recepient/IEmailRecepientOutput";
import {Form, Tab, Table} from "react-bootstrap";
import InputControl from "../../../components/form/InputControl";
import ButtonPrimary from "../../../components/common/ButtonPrimary";

import removeIcon from "../../../assets/iconpack/delete.svg"
import add from "../../../assets/iconpack/add.svg"

import edit from "../../../assets/iconpack/edit.svg"
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import LayoutDefault from "../../../components/structure/LayoutDefault";


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
            alert("contact.oops");
        });
    }

    const removeRecepient = (id: string) => {
        recepientService.delete(id).then((res) => {
            fetchRecepients();
            setMessage("contact.recipientDeleted")
        }).catch(() => {
            alert("contact.oops");
        })
    }

    const onSubmit = (fieldValues: IEmailRecepientOutput) => {
        recepientService.create(fieldValues).then((res) => {
            fetchRecepients();
            setMessage("contact.recipientAdded")
        }).catch(() => {
            alert("contact.oops");
        });
    }

    return (
        <>
            <LayoutDefault headerContent={<div className={"d-flex"}>
                <SubHeadingPurple className={"mt-2"}>
                    {t("contact.recipientsTitle")}
                </SubHeadingPurple>
                <Popup
                    content={<AddRecepientElement onSubmit={onSubmit}/>} cname={"icon-wrapper-lg"}
                    trigger={<img className={"icon-wrapper"} alt={"Add"} src={add}/>}/>
            </div>} bodyContent={<>
                <span className={"text-success"}>{t(message)}</span>

                <div className={"mt-2"}>
                    <Table responsive className={"w-25"} variant={"striped"}>
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
                                                             displayText={t("contact.RUSure")}
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

                <div className={"d-flex"}>
                    <SubHeadingPurple className={"mt-2"}>{t('contact.listTitle')}</SubHeadingPurple>
                    <img onClick={toCreate}
                         className={"icon-wrapper"}
                         alt={"Add contact person"}
                         src={add}/>

                </div>

                <Table responsive className={"w-50 mt-2"}>

                    <tbody>
                    {people?.map(person => {
                        return <tr>
                            <td width={400} className={'p-0'}>

                                <ContactPerson name={person.name} body={person.body}/>
                            </td>
                            <td width={50} className={"p-0"}>
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
                </Table></>}/>


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
