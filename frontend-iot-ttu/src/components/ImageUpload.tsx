import React, { ChangeEvent, FC, useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { INewsOutput } from '../DTO/INewsOutput';

interface Props {
  register: UseFormRegister<INewsOutput>;
  setValue: UseFormSetValue<INewsOutput>;
  name: keyof INewsOutput;
}

const ImageUploader: FC<Props> = ({ register, setValue, name }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // base64 string
        setPreview(base64String);
        setValue(name, base64String); // set base64 string to 'file' field
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Upload Image</label>
      <input
        type="file"
        className="form-control"
        onChange={onImageChange}
      />
      {preview && (
        <div className="mt-3">
          <label className="form-label">Image Preview</label>
          <img src={preview as string}  alt="Thumbnail preview" className="content_image w-25" />
        </div>
      )}
      <input {...register(name)} type="hidden" /> {/* hidden 'file' input */}
    </div>
  );
};

export default ImageUploader;
