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
import { INewsOutput } from "../../DTO/News/INewsOutput";
import { useTranslation } from "react-i18next";
import NewsTopicAreaInput from "./NewsTopicAreaInput";

interface IProps {
	register: UseFormRegister<INewsOutput>;
	errors: any;
	control: Control<INewsOutput, any>;
	onEditorStateChangeEng: (html: string) => void;
	onEditorChangeEst: (html: string) => void;
	editorHtmlEng: string;
	editorHtmlEst: string;
	setValue: UseFormSetValue<INewsOutput>;
	getValues: UseFormGetValues<INewsOutput>
	onSubmit: (event: any) => void;
	modules: any;
	formats: any;
	handleSubmit: UseFormHandleSubmit<INewsOutput, undefined>;
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
			<h2 className="mt-5 header-purple">Thumbnail</h2>
			<ImageUploader
				label={t("createNews.uploadPoster")}
				register={register}
				setValue={setValue}
				name={"file"}
				fileSize={5}
			/>
			<h2 className="mt-5 header-purple">Post author</h2>
			<FormFloating className="mb-2">
				<FormControl
					{...register("author")}
					placeholder="Title est"
					type="text"
					id="author"
					name="author"
				/>
				<FormLabel htmlFor="author">
					{t("createNews.author")}
					<span className="text-danger">
						{errors.author?.message?.toString()}
					</span>
				</FormLabel>
			</FormFloating>
			<h2 className="mt-5 header-purple">Categories</h2>
			<NewsTopicAreaInput control={control} setValue={setValue} getValues={getValues} register={register} errors={errors}/>

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
