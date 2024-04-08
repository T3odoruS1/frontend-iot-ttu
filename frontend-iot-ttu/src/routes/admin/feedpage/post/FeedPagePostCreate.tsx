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
import { Loader } from "../../../../components/Loader";
import { SuccessAlert } from "../../../../components/lottie/SuccessAlert";
import Show from "../../../../components/common/Show";
import LayoutNoHeader from "../../../../components/structure/LayoutNoHeader";

const schema = yup.object().shape({
  id: yup.string().uuid().nullable(),
  title: yup
    .array()
    .length(2)
    .of(
      yup.object().shape({
        value: yup.string().trim().min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
        culture: yup.string().min(1, "").required(),
      })
    )
    .required(),
  body: yup
    .array()
    .length(2)
    .of(
      yup.object().shape({
        value: yup.string().trim()
            .notOneOf(["<p><br></p>"], "admin.news.adminNews.create.validation.fieldIsRequired")
            .min(1, `admin.news.adminNews.create.validation.fieldIsRequired`).required(),
        culture: yup.string().min(1, "").required(),
      })
    )
    .required(),
  feedPageCategoryId: yup.string()
      .uuid("admin.news.adminNews.create.validation.fieldIsRequired")
      .required(`admin.news.adminNews.create.validation.fieldIsRequired`),
  page: yup.string()
});

const FeedPagePostCreate = () => {
  const [preview, setPreview] = useState<boolean>(false);
  const [submitPending, setSubmitPending] = useState(false);


  const displaySuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("../")

    }, 1000)
  }
  const service = new FeedService();
  const navigate = useNavigate();

  const { register,
    setValue,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
    watch} = useForm<IFeedPagePostOutput>({ resolver: yupResolver(schema) });

  useEffect(() => {
    reset();
    setValue(`title.${0}.culture`, "en");
    setValue(`title.${1}.culture`, "et");
    setValue(`body.${0}.culture`, "en");
    setValue(`body.${1}.culture`, "et");
  }, []);

  const [success, setSuccess] = useState(false);


  const onSubmit = (fieldValues: FieldValues) => {
    setSubmitPending(true);
    if(fieldValues.id === undefined){
      service.createPost(fieldValues as IFeedPagePostOutput).then(res => {
        displaySuccess();
        setSubmitPending(false);
      });
    }else{
      service.updatePost(fieldValues as IFeedPagePostOutput).then(res => {
        displaySuccess();
        setSubmitPending(false);
      })
    }


  }


  return <LayoutNoHeader bodyContent={<>
    <PageTitle>Create feed page post</PageTitle>

    <Show>
      <Show.When isTrue={submitPending}><Loader/></Show.When>
    </Show>

    <Show>
      <Show.When isTrue={success}><SuccessAlert scroll={true}/></Show.When>
    </Show>

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


    {/*In this way views will not rerender and state will be persisted correctly, DO NOT REFACTOR!*/}
    <div className={!preview ? "d-none" : ""}>
      <FeedPagePostPreview fieldValues={getValues()} />
    </div>
    <div className={preview ? "d-none" : ""}>
      <FeedPagePostForm
          watch={watch}
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          setValue={setValue}
          getValues={getValues}
          errors={errors}/>
    </div>
  </>}/>
}

export default FeedPagePostCreate;