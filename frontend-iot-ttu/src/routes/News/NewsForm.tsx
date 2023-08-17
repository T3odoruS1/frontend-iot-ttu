import { FormControl, FormFloating, FormLabel, Button } from "react-bootstrap";
import {
	Control,
	UseFormGetValues,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import ReactQuill from "react-quill";
import ImageUploader from "../../components/ImageUpload";
import { useTranslation } from "react-i18next";
import NewsTopicAreaInput from "./NewsTopicAreaInput";
import { INewsOutputDTO } from "../../DTO/News/INewsOutputDTO";

interface IProps {
	register: UseFormRegister<INewsOutputDTO>;
	errors: any;
	control: Control<INewsOutputDTO, any>;
	onEditorStateChangeEng: (html: string) => void;
	onEditorChangeEst: (html: string) => void;
	editorHtmlEng: string;
	editorHtmlEst: string;
	setValue: UseFormSetValue<INewsOutputDTO>;
	getValues: UseFormGetValues<INewsOutputDTO>;
	onSubmit: (event: any) => void;
	modules: any;
	formats: any;
	handleSubmit: UseFormHandleSubmit<INewsOutputDTO, undefined>;
}

const NewsForm: React.FC<IProps> = ({
	register,
	errors,
	control,
	onEditorStateChangeEng,
	onEditorChangeEst,
	editorHtmlEng,
	editorHtmlEst,
	onSubmit,
	setValue,
	getValues,
	modules,
	formats,
	handleSubmit,
}) => {
	const { t } = useTranslation();
	return (
		<form onSubmit={handleSubmit(onSubmit)} id="news-form">
			<h2 className="header-purple">Titles</h2>
			<FormFloating className="mb-2">
				<FormControl
					{...register(`title.${0}.value`)}
					placeholder="Title in English"
					type="text"
					id={`title.${0}.value`}
					name={`title.${0}.value`}
				/>
				<FormLabel htmlFor={`title.${0}.value`}>
					{t("createNews.titleInEnglish")}
					<span className="text-danger">
						{errors.titleEng?.message?.toString()}
					</span>
				</FormLabel>
			</FormFloating>
			<input
				type="text"
				{...register(`title.${0}.culture`)}
				name={`title.${0}.culture`}
				id={`title.${0}.culture`}
				value={"en"}
				hidden
			/>
			<input
				type="text"
				{...register(`title.${1}.culture`)}
				name={`title.${1}.culture`}
				id={`title.${1}.culture`}
				value={"et"}
				hidden
			/>
			<input
				type="text"
				{...register(`body.${0}.culture`)}
				name={`body.${0}.culture`}
				id={`body.${0}.culture`}
				value={"en"}
				hidden
			/>
			<input
				type="text"
				{...register(`body.${1}.culture`)}
				name={`body.${1}.culture`}
				id={`body.${1}.culture`}
				value={"et"}
				hidden
			/>
			<FormFloating className="mb-2">
				<FormControl
					{...register(`title.${1}.value`)}
					placeholder="Title est"
					type="text"
					id={`title.${1}.value`}
					name={`title.${1}.value`}
				/>
				<FormLabel htmlFor={`title.${1}.value`}>
					{t("createNews.titleInEstonian")}
					<span className="text-danger">
						{errors.titleEst?.message?.toString()}
					</span>
				</FormLabel>
			</FormFloating>
			<h2 className="mt-5 header-purple">Thumbnail</h2>
			<ImageUploader
				label={t("createNews.uploadPoster")}
				register={register}
				setValue={setValue}
				name={"image"}
				fileSize={5}
			/>
			<h2 className="mt-5 header-purple">{t("createNews.author")}</h2>
			<FormFloating className="mb-2">
				<FormControl
					{...register("author")}
					placeholder="Title est"
					type="text"
					id="author"
					name="author"
				/>
				<FormLabel htmlFor="author">
					{t("createNews.authorName")}
					<span className="text-danger">
						{errors.author?.message?.toString()}
					</span>
				</FormLabel>
			</FormFloating>
			<h2 className="mt-5 header-purple">{t("createNews.categories")}</h2>
			<NewsTopicAreaInput
				control={control}
				setValue={setValue}
				getValues={getValues}
				register={register}
				errors={errors}
			/>

			<h2 className="mt-5 header-purple">{t("createNews.contentEng")}</h2>
			<ReactQuill
				theme="snow"
				value={editorHtmlEng}
				onChange={onEditorStateChangeEng}
				modules={modules}
				formats={formats}
			/>

			<h2 className="mt-5 header-purple">{t("createNews.contentEst")}</h2>
			<ReactQuill
				theme="snow"
				value={editorHtmlEst}
				onChange={onEditorChangeEst}
				modules={modules}
				formats={formats}
			/>

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
