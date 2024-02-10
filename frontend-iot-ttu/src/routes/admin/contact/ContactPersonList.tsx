import PageTitle from "../../../components/common/PageTitle";
import useFetch from "../../../hooks/useFetch";
import {IContactPerson} from "../../../dto/contact/people/IContactPerson";
import {ContactPersonService} from "../../../services/ContactPersonService";
import i18n from "i18next";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {ContactPerson} from "../../../components/ContactPerson";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import {useState} from "react";
import ActionConfirmationAlert from "../../../components/common/ActionConfirmationAlert";

const ContactPersonList = () => {
    const navigate = useNavigate();
    const service = new ContactPersonService();
    const {data: people, pending, setData, error} =
        useFetch<IContactPerson[]>(service.getAll, [i18n.language]);

    const toCreate = () => {
        navigate("./create");
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

    return (
        <>
            <PageTitle>Contact person management</PageTitle>
            <ButtonSmaller onClick={toCreate}>Create</ButtonSmaller>
            <div className={"my-5"}>{people?.map(person => {
                return <div>
                    <div className={''}>
                        <ActionConfirmationAlert action={() => {remove(person.id)}} displayText={"You sure you want to remove this contact?"}
                                                 buttonText={"Delete"}/>
                        <ButtonSmaller className={"h-25 m-2 mb-5"}>Update</ButtonSmaller>
                        <ContactPerson name={person.name} body={person.body}/>


                    </div>
                    <hr/>
                </div>

            })}</div>

        </>
    );
};

export default ContactPersonList;