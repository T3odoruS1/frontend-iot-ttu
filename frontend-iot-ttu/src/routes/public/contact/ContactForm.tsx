import { FormControl, FormFloating, FormLabel } from "react-bootstrap";

const ContactForm = () => {
	return (
		<>
			<div>
				<form>
					<div className="w-100 mt-2 mb-4">
						<FormFloating>
							<FormLabel>Teema</FormLabel>
							<FormControl />
						</FormFloating>
					</div>

					<div className="mb-4 w-100">
						<FormFloating>
							<FormLabel>Teie e-mail</FormLabel>
							<FormControl />
						</FormFloating>
					</div>
					<div className="mb-4 w-100">
						<FormFloating>
							<FormLabel>Teema</FormLabel>
							<FormControl as="textarea" rows={3} />
						</FormFloating>
					</div>

					<div className="mt-2">
						<button className="btn btn-ttu-pink" type="button">
							Salvesta
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ContactForm;
