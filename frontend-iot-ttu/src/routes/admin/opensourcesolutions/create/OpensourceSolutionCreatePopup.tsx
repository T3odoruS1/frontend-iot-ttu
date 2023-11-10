import {TitlePink} from "../../../../components/common/TitlePink";
import InputControl from "../../../../components/form/InputControl";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import React, {useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  repoName: yup.string().required(" - please input desired repo name")
});

interface IFormOutput {
  repoName: string;
}

interface ICloseProps {
  close?: () => {}
}

const OpensourceSolutionCreatePopup : React.FC<ICloseProps> = ({close}) => {

  const [showResult, setShowResult] = useState(false);

  const {
    register,
    handleSubmit,
      getValues,
    formState: {errors}
  } = useForm<IFormOutput>({resolver: yupResolver(schema)});

  const [message, setMessage] = useState("");

  const takenName = "some taken name";

  const onSubmit = async (fieldValues: FieldValues) => {
    if(fieldValues["repoName"] !== takenName){
      onSuccess();
      return;
    }
    onFail();

  }

  const onSuccess = () => {
    console.log("success")
    setMessage("")
      setShowResult(true)
  }

  const onFail = () => {
    console.log("fail")
      setShowResult(false);
      setMessage("Repo name taken!")
  }

  if(showResult){
    return<>
      <div className="git-popup p-5">
        <TitlePink>Repo lisatud</TitlePink>

        <p>Siin on käsud, et kasutada selle repo</p>
        <div className={"code-block"}>
          git init <br/>
          git add README.md<br/>
          git commit -m "first commit"<br/>
          git branch -M main<br/>
          git remote add origin https://ttuiot.gitlab.com/iot/{getValues("repoName").replaceAll(" ", "_")}.git<br/>
          git push -u origin main<br/>
        </div>
        <ButtonSmaller
            type="button"
            className=" m-2 p-2 w-25"
            onClick={() => close!()}>
          Tehtud
        </ButtonSmaller>

      </div>
    </>
  }

  return <>
    <div className="git-popup p-5">
      <TitlePink>Loo repo</TitlePink>
      {message && <p>{ message}</p>}
      <p>Palun sisesta repo nimi</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputControl type={"text"}
                      error={errors.repoName?.message?.toString()}
                      register={register}
                      label={"Repository name"}
                      name={"repoName"}></InputControl>

        <div className="d-inline">
          <ButtonSmaller
              type="submit"
              className="mt-2 p-2 w-25">
            Loo repo
          </ButtonSmaller>
          <ButtonSmaller
              type="button"
              className=" m-2 p-2 w-25"
              onClick={() => close!()}>
            Tagasi
          </ButtonSmaller>
        </div>
      </form>


    </div>
  </>
}

export default OpensourceSolutionCreatePopup;