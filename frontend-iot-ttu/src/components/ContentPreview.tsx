import { useState } from "react";
import NewsContent from "./NewsContent";
import { INewsOutputDTO } from "../dto/news/INewsOutputDTO";
import placeholder from "../assets/placeholder.webp"
import i18n from 'i18next';
import { useTranslation } from "react-i18next";

interface IProps {
	formValues: INewsOutputDTO;
}

const ContentPreview = (props: IProps) => {
	const getContent = (value: string | undefined, def: string) => {
		if(value !== undefined && value.length > 0){
			return value;
		}
		return def;
	}

	const getImage = (imageContent: string) => {		
		if(imageContent !== undefined && imageContent && imageContent.length > 0){
			return imageContent;
		}		
		return placeholder;
	}

	return (
		<>
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
