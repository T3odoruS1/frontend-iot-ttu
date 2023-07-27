import { useForm, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { formats, modules } from "../../Configurations/configurations";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NewsForm from "./NewsForm";
import ContentPreview from "../../components/ContentPreview";
import { FormCheck, FormFloating } from "react-bootstrap";
import { INewsOutput } from "../../DTO/News/INewsOutput";

interface IProps {
	onSubmit: (event: FieldValues) => void;
}

const schema = yup.object().shape({
	titleEng: yup.string().min(1, "This field is required").required(),
	titleEst: yup.string().min(1, "This field is required").required(),
	contentEng: yup.string().required(),
	contentEst: yup.string().required(),
	file: yup.mixed(),
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
		formState: { errors },
	} = useForm<INewsOutput>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		register("contentEng", { required: true, minLength: 11 });
	}, [register]);
	useEffect(() => {
		console.log(getValues().file.toString());
	}, [preview, getValues]);

	const onEditorStateChangeEng = (html: string) => {
		setValue("contentEng", html);
		setEditorHtmlEng(html);
	};

	const onEditorChangeEst = (html: string) => {
		setValue("contentEst", html);
		setEditorHtmlEst(html);
	};

	return (
		<>
			<br />
			<div className="d-flex">
				<h2 className="m-2">{t('createNews.createNewPost')}</h2>
				<FormFloating>
					<FormCheck
						type="switch"
						id="custom-switch"
						label="Preview"
						checked={preview}
						onChange={() => {
							setPreview(!preview);
						}}/>
				</FormFloating>
			</div>
			<hr />

			<div style={{display: preview ? "none" : "block"}}>
				<NewsForm
					register={register}
					t={t}
					errors={errors}
					handleSubmit={handleSubmit}
					onEditorStateChangeEng={onEditorStateChangeEng}
					onEditorChangeEst={onEditorChangeEst}
					editorHtmlEng={editorHtmlEng}
					editorHtmlEst={editorHtmlEst}
					onSubmit={props.onSubmit}
					setValue={setValue}
					modules={modules}
					formats={formats}
				/>
			</div>
			<div style={{display: preview ? "block" : "none"}}>
				<ContentPreview
				 formValues={getValues()} />
			</div>
		</>
	);
};

export default NewsCreateFormWithPreview;