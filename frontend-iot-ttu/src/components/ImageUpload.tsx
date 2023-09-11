import React, { ChangeEvent, FC, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { INewsOutput } from "../dto/news/INewsOutput";
import { useTranslation } from "react-i18next";
import { INewsOutputDTO } from "../dto/news/INewsOutputDTO";

interface Props {
	register: UseFormRegister<INewsOutputDTO>;
	setValue: UseFormSetValue<INewsOutputDTO>;
	name: keyof INewsOutputDTO;
	label: string;
	fileSize: number;
}
const ImageUploader: FC<Props> = ({
	register,
	setValue,
	name,
	label,
	fileSize,
}) => {
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const { t } = useTranslation();

	const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		if (file) {
			if (file.size > fileSize * 1024 * 1024) {
				// 2MB
				alert(t("fileIsTooBig", { size: fileSize }));
				event.target.value = "";
			} else {
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64String = reader.result as string;
					setPreview(base64String);
					setFileName(file.name); // Set file name
					setValue(name, base64String);
				};
				reader.readAsDataURL(file);
			}
		} else {
			setFileName(null);
		}
	};

	const onImageRemove = () => {
	  if(fileName){
		setValue(name, "");
		setFileName("");
		setPreview("");
	  }
	};

	return (
		<div className="mb-3 row">
			<div className="col-md-8">
				{/* <label className="form-label">{label}</label> */}
				<div className="input-group">
					<button
						className="btn btn-ttu-pink"
						type="button"
						id="button-addon2">
						<label htmlFor="file-input" style={{ marginBottom: 0 }}>
							{t("admin.imageUploader.chooseFile")}
						</label>
					</button>
					<input
						type="file"
						className="form-control d-none" // Hide actual input
						onChange={onImageChange}
						id="file-input" // Id to associate with label
					/>
					<label htmlFor="file-input" className="form-control">
						{fileName || t("admin.imageUploader.clickToUploadFile")}
					</label>
					
				</div>
				<button className="btn btn-ttu-pink mt-2"  onClick={onImageRemove} type="button">Remove</button>
			</div>
			<div className="col-md-4">
			{preview && (
				<div className="mt-3">
					<img
						src={preview as string}
						alt="Thumbnail preview"
						className="content_image"
					/>
				</div>
				
			)}
			</div>

			<input {...register(name)} type="hidden" />
		</div>
	);
};

export default ImageUploader;
