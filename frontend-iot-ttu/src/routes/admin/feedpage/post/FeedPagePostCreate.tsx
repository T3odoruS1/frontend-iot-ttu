import { useEffect, useState } from "react";
import { FormFloating, FormCheck } from "react-bootstrap";
import PageTitle from "../../../../components/common/PageTitle";
import FeedPagePostPreview from "./FeedPagePostPreview";
import FeedPagePostForm from "./FeedPagePostForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFeedPagePostOutput } from "../../../../dto/feedpage/post/IFeedPagePostOutput";
import { FieldValues, useForm } from "react-hook-form";
import { FeedService } from "../../../../services/FeedService";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  id: yup.string().uuid().nullable(),
  title: yup
    .array()
    .length(2)
    .of(
      yup.object().shape({
        value: yup.string().min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
        culture: yup.string().min(1, "").required(),
      })
    )
    .required(),
  body: yup
    .array()
    .length(2)
    .of(
      yup.object().shape({
        value: yup.string().min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
        culture: yup.string().min(1, "").required(),
      })
    )
    .required(),
  feedPageCategoryId: yup.string().uuid().required(`admin.news.adminNews.create.validation.fieldIsRequired`)
});

const FeedPagePostCreate = () => {
  const [preview, setPreview] = useState<boolean>(false);

  const service = new FeedService();
  const navigate = useNavigate();

  const { register, setValue, getValues, handleSubmit, formState: { errors } } =
    useForm<IFeedPagePostOutput>({ resolver: yupResolver(schema) });

    useEffect(() => {
      setValue(`title.${0}.culture`, "en");
      setValue(`title.${1}.culture`, "et");
      setValue(`body.${0}.culture`, "en");
      setValue(`body.${1}.culture`, "et");
  }, []);

  const [success, setSuccess] = useState(false);


  const onSubmit = (fieldValues: FieldValues) => {
    service.createPost(fieldValues as IFeedPagePostOutput).then(res => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("../")
      }, 1000)
    })
  }


  return <>
    <PageTitle>Create feed page post</PageTitle>
    <FormFloating>
      <FormCheck
        type="checkbox"
        id="custom-switch"
        label="Preview"
        checked={preview}
        onChange={() => {
          setPreview(!preview);
        }}
      />

    </FormFloating>

    {preview ? <FeedPagePostPreview fieldValues={getValues()} /> : <FeedPagePostForm
      handleSubmit={handleSubmit}
      register={register}
      onSubmit={onSubmit}
      setValue={setValue}
      getValues={getValues}
      errors={errors}
    />}
  </>
}

export default FeedPagePostCreate;