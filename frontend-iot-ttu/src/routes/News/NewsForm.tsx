import { INewsOutput } from "../../DTO/INewsOutput";
import { FormControl, FormFloating, FormLabel, Button } from "react-bootstrap";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { TFunction } from "i18next";
import ReactQuill from "react-quill";
import ImageUploader from "../../components/ImageUpload";

interface IProps {
	register: UseFormRegister<INewsOutput>;
	t: TFunction;
	errors: any;
	onEditorStateChangeEng: (html: string) => void;
	onEditorChangeEst: (html: string) => void;
	editorHtmlEng: string;
	editorHtmlEst: string;
	setValue: UseFormSetValue<INewsOutput>;
	onSubmit: (event: any) => void;
	modules: any;
	formats: any;
}

const NewsForm: React.FC<IProps> = ({
	register,
	t,
	errors,
	onEditorStateChangeEng,
	onEditorChangeEst,
	editorHtmlEng,
	editorHtmlEst,
	onSubmit,
	setValue,
	modules,
	formats,
}) => {
	return (
		<form onSubmit={onSubmit} id="news-form">
			<FormFloating className="mb-2">
				<FormControl
					{...register("titleEng")}
					placeholder="Title in English"
					type="text"
					id="titleEng"
					name="titleEng"
				/>
				<FormLabel htmlFor="titleEng">
					{t("createNews.titleInEnglish")}
					<span className="text-danger">
						{errors.titleEng?.message?.toString()}
					</span>
				</FormLabel>
			</FormFloating>
			<FormFloating className="mb-2">
				<FormControl
					{...register("titleEst")}
					placeholder="Title est"
					type="text"
					id="titleEst"
					name="titleEst"
				/>
				<FormLabel htmlFor="titleEst">
					{t("createNews.titleInEstonian")}
					<span className="text-danger">
						{errors.titleEst?.message?.toString()}
					</span>
				</FormLabel>
			</FormFloating>
			<ImageUploader label={t("createNews.uploadPoster")} register={register} setValue={setValue} name={"file"} fileSize={5} />
			<div>
        <h3>{t("createNews.contentEng")}</h3>
				<ReactQuill
					theme="snow"
					value={editorHtmlEng}
					onChange={onEditorStateChangeEng}
					modules={modules}
					formats={formats}
				/>
			</div>
			<br />
			<br />
			<div>
        <h3>{t("createNews.contentEst")}</h3>
				<ReactQuill
					theme="snow"
					value={editorHtmlEst}
					onChange={onEditorChangeEst}
					modules={modules}
					formats={formats}
				/>
			</div>
			<br />
			<br />
			<Button
				type="submit"
				id="registerSubmit"
				className="w-100 btn_custom_out">
				{t("createNews.create")}
			</Button>
		</form>
	);
};

export default NewsForm;
