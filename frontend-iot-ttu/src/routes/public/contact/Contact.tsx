import {Col, Row} from "react-bootstrap";
import PageTitle from "../../../components/common/PageTitle";
import ContactForm from "./ContactForm";
import {useTranslation} from "react-i18next";
import useFetch from "../../../hooks/useFetch";
import {IContactPerson} from "../../../dto/contact/people/IContactPerson";
import {ContactPersonService} from "../../../services/ContactPersonService";
import i18n from "i18next";
import {ContactPerson} from "../../../components/ContactPerson";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const Contact = () => {
    const {t} = useTranslation();
    useDocumentTitle(t("titles.contact"))
    const service = new ContactPersonService();
    const {data: people, pending, error} =
        useFetch<IContactPerson[]>(service.getAll, [i18n.language])
    return (
        <>
            <PageTitle>{t("public.contact.contact")}</PageTitle>
            <Row className="mt-5">
                <Col md={6}>
                    <ContactForm/>
                </Col>
                <Col md={6}>
                    {people?.map(p => {
                        return <div className={"d-flex justify-content-end "}>
                            <ContactPerson name={p.name} body={p.body}/>
                        </div>
                    })}
                </Col>
            </Row>
        </>
    );
};

export default Contact;
