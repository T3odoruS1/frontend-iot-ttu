import { useState } from "react";
import { FormCheck, FormFloating } from "react-bootstrap";
import NewsContent from "./NewsContent";
import { INewsOutputDTO } from "../dto/news/INewsOutputDTO";

interface IProps {
	formValues: INewsOutputDTO;
}

const ContentPreview = (props: IProps) => {
	const [language, setLanguage] = useState("et"); // default language is Estonian

	const onLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLanguage(event.target.checked ? "en" : "et");
	};

	return (
		<>
			<FormFloating>
				<FormCheck
					type="switch"
					id="custom-switch"
					label={language === "et" ? "Estonian" : "English"}
					checked={language === "en"}
					onChange={onLanguageChange}></FormCheck>
			</FormFloating>
			<br />
			<div className="d-inline-flex justify-content-center align-items-center w-100">
				<NewsContent
					title={
						language === "et"
							? (props.formValues?.title?.at(1)?.value ?? "")
							: (props.formValues?.title?.at(0)?.value ?? "")
					}
					image={props.formValues.image}
					createdAt={Date.now().toString()}
					author={props.formValues.author}
					content={
						language === "et"
							? (props.formValues?.body?.at(1)?.value ?? "")
							: (props.formValues?.body?.at(0)?.value ?? "")
					}
					lang={language}
				/>
			</div>
		</>
	);
};

export default ContentPreview;
