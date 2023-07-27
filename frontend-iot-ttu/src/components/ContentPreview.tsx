import { useState } from "react";
import { FormCheck, FormFloating } from "react-bootstrap";
import { INewsOutput } from "../DTO/News/INewsOutput";
import NewsContent from "./NewsContent";

interface IProps {
	formValues: INewsOutput;
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
			<div className="d-inline-flex justify-content-center align-items-center">
				<NewsContent
					title={
						language === "et"
							? props.formValues.titleEst
							: props.formValues.titleEng
					}
					image={props.formValues.file}
					createdAt={"10:00:00"}
					author={"Mr. Author"}
					content={
						language === "et"
							? props.formValues.contentEst
							: props.formValues.contentEng
					}
					lang={language}
				/>
			</div>
		</>
	);
};

export default ContentPreview;
