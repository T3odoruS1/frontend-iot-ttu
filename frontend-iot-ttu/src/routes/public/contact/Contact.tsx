import { Col, Row } from "react-bootstrap";
import PageTitle from "../../../components/common/PageTitle";
import ContactForm from "./ContactForm";

const Contact = () => {
	return (
		<>
			<PageTitle>Contact us</PageTitle>
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
