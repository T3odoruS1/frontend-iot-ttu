import { useState } from "react";
import { FormCheck, FormFloating } from "react-bootstrap";
import NewsContent from "./NewsContent";
import { INewsOutputDTO } from "../dto/news/INewsOutputDTO";
import placeholder from "../assets/placeholder.webp"
import i18n from 'i18next';
import { useTranslation } from "react-i18next";

interface IProps {
	formValues: INewsOutputDTO;
}

const ContentPreview = (props: IProps) => {
	const [language, setLanguage] = useState("et"); // default language is Estonian
	const {t} = useTranslation();
	const onLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLanguage(event.target.checked ? "en" : "et");
	};

	const getContent = (value: string | undefined, def: string) => {
		if(value !== undefined && value.length > 0){
			return value;
		}
		return def;
	}

	const getImage = (imageContent: string) => {
		console.log(imageContent);
		
		if(imageContent !== undefined && imageContent && imageContent.length > 0){
			return imageContent;
		}
		console.log("Returning placeholder");
		
		// return placeholder;
		return placeholder;
	}

	return (
		<>
			{/* <FormFloating>
				<FormCheck
					type="switch"
					id="custom-switch"
					label={i18n.language === "et" ? "Estonian" : "English"}
					checked={i18n.language === "en"}
					onChange={onLanguageChange}></FormCheck>
			</FormFloating>
			<br /> */}
			<div className="d-inline-flex justify-content-center align-items-center w-100">
				<NewsContent
					title={
						i18n.language === "en"
							? (getContent(props.formValues?.title?.at(1)?.value, "No title"))
							: (getContent(props.formValues?.title?.at(0)?.value, "Pealkirja ei ole"))
					}
					image={getImage(props.formValues.image)}
					createdAt={new Date().toDateString()}
					author={props.formValues.author}
					content={
						i18n.language === "et"
							? (props.formValues?.body?.at(1)?.value ?? "No content")
							: (props.formValues?.body?.at(0)?.value ?? "Sisu ei ole")
					}
					lang={i18n.language}
				/>
			</div>
		</>
	);
};

export default ContentPreview;
