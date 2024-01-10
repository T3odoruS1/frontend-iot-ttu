import { Col, Row } from "react-bootstrap";
import PageTitle from "../../../components/common/PageTitle";
import ContactForm from "./ContactForm";
import {useTranslation} from "react-i18next";

const Contact = () => {
	const {t} = useTranslation();

	return (
		<>
			<PageTitle>{t("public.contact.contact")}</PageTitle>
			<Row className="mt-5">
				<Col>
					<ContactForm />
				</Col>
				<Col>INFO</Col>
			</Row>
		</>
	);
};

export default Contact;
