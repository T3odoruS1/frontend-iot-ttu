import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ButtonSmaller from "../common/ButtonSmaller";
import {SUPPORTED_FILE_FORMATS} from "../../configs/configurations";

interface Props {
    register: any;
    setValue: any;
    getValue: any;
    name: any;
    label: string;
    fileSize: number;
}

const ImageUploader: FC<Props> = ({
                                      register,
                                      setValue,
                                      name,
                                      getValue,
                                      label,
                                      fileSize,
                                  }) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [fileName, setFileName] = useState<string | null>(" ");
    const {t} = useTranslation();

    useEffect(() => {
        console.log(getValue())
        setPreview(getValue().image);

    }, [getValue().image]);

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file) {
            if (!SUPPORTED_FILE_FORMATS.includes(file.type)) {
                alert(t("unsupportedFileType", {types: SUPPORTED_FILE_FORMATS.join(', ')}));
                event.target.value = ""; // Reset file input
                return; // Exit function if file is not supported
            }

            if (file.size > fileSize * 1024 * 1024) {

                alert(t("fileIsTooBig", {size: fileSize}));
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

    useEffect(() => {
        setPreview(getValue().image)
    }, [getValue().image]);

    const onImageRemove = () => {
        if (fileName) {
            setValue(name, "");
            setFileName("");
            setPreview("");
        }
    };

    return (
        <div className="mb-3 row">
            <div className="col-md-8">
                <div className="input-group">
                    <button
                        className="btn b-radius-0 btn-ttu-pink"
                        type="button"
                        id="button-addon2">
                        <label htmlFor="file-input" style={{
                            marginBottom: 0}}>
                            {t("admin.imageUploader.chooseFile")}
                        </label>
                    </button>
                    <input
                        style={{borderRadius: "0px"}}
                        type="file"
                        className="form-control d-none" // Hide actual input
                        onChange={onImageChange}
                        id="file-input" // Id to associate with label
                    />
                    <label style={{borderRadius: "0px"}}
                           htmlFor="file-input" className="form-control">
                        {fileName || t("admin.imageUploader.clickToUploadFile")}
                    </label>

                </div>
                <ButtonSmaller className="mt-4" onClick={onImageRemove} type="button">{t("common.remove")}</ButtonSmaller>
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

            <input {...register(name)} type="hidden"/>
        </div>
    );
};

export default ImageUploader;
