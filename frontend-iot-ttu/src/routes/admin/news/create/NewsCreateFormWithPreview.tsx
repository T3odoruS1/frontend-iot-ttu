import { useForm, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormCheck, FormFloating } from "react-bootstrap";
import NewsForm from "./NewsForm";
import { INewsOutputDTO } from "../../../../dto/news/INewsOutputDTO";
import { formats, modules } from "../../../../configs/configurations";
import ContentPreview from "../../../../components/ContentPreview";

interface IProps {
	onSubmit: (event: FieldValues) => void;
}

const schema = yup.object().shape({
	title: yup
		.array()
		.length(2)
		.of(
			yup.object().shape({
				value: yup.string().min(1, "This field is required").required(),
				culture: yup.string().min(1, "This field is required").required(),
			})
		)
		.required(),
	body: yup
		.array()
		.length(2)
		.of(
			yup.object().shape({
				value: yup.string().min(1, "This field is required").required(),
				culture: yup.string().min(1, "This field is required").required(),
			})
		)
		.required(),
	image: yup.mixed(),
	author: yup
		.string()
		.min(1, "Author name should be at least 1 letter")
		.required(),
	topicAreas: yup
		.array()
		.of(
			yup.object().shape({
				id: yup.string().uuid("Topic area must be chosen").required(),
			})
		)
		.required(),
});

const NewsCreateFormWithPreview = (props: IProps) => {
	const { t } = useTranslation();
	const [editorHtmlEng, setEditorHtmlEng] = useState<string>("");
	const [editorHtmlEst, setEditorHtmlEst] = useState<string>("");
	const [preview, setPreview] = useState<boolean>(false);

	const {
		register,
		setValue,
		getValues,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<INewsOutputDTO>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		console.log(getValues().image.toString());
	}, [preview, getValues]);

	const onEditorStateChangeEng = (html: string) => {
		setValue(`body.${0}.value`, html);
		setEditorHtmlEng(html);
	};

	const onEditorStateChangeEst = (html: string) => {
		setValue(`body.${1}.value`, html);
		setEditorHtmlEst(html);
	};

	return (
		<>
			<br />
			<div className="d-flex w-100">
				<h4 className="m-2 page_title">
					{t("admin.news.adminNews.create.createNewPost")}
				</h4>
			</div>
			<FormFloating>
				<FormCheck
					type="switch"
					id="custom-switch"
					label="Preview"
					checked={preview}
					onChange={() => {
						setPreview(!preview);
					}}
				/>
			</FormFloating>
			<hr />

			<div className="w-100" style={{ display: preview ? "none" : "block" }}>
				<NewsForm
					control={control}
					register={register}
					errors={errors}
					handleSubmit={handleSubmit}
					onEditorStateChangeEng={onEditorStateChangeEng}
					onEditorChangeEst={onEditorStateChangeEst}
					editorHtmlEng={editorHtmlEng}
					editorHtmlEst={editorHtmlEst}
					onSubmit={props.onSubmit}
					setValue={setValue}
					getValues={getValues}
					modules={modules}
					formats={formats}
				/>
			</div>
			<div style={{ display: preview ? "block" : "none" }}>
				<ContentPreview formValues={getValues()} />
			</div>
		</>
	);
};

export default NewsCreateFormWithPreview;
