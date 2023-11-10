import {TitlePink} from "../../../components/common/TitlePink";
import InputControl from "../../../components/form/InputControl";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import React, {useState} from "react";
import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    email: yup.string().email(" - email should be valid").required(" - please input email")
});

interface IFormOutput {
    email: string;
}

interface ICloseProps {
    close?: () => {}
}

export const OpenSourceSolutionRequestPopup: React.FC<ICloseProps> = ({close}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<IFormOutput>({resolver: yupResolver(schema)});

    const [message, setMessage] = useState("");

    const onSubmit = async (fieldValues: FieldValues) => {
        console.log(fieldValues);
        onSuccess();
    }

    const onSuccess = () => {
        setMessage("Link to repo sent to your email");

        setTimeout(() => {
            close!();
            setMessage("");
            setValue("email", "");
        }, 1000)
    }

    const onFail = () => {

    }
    return (
        <><div className="git-popup p-5">
            <TitlePink>Ligipaas repole</TitlePink>
            {message && <p>✅ { message}</p>}
            <p>Palun sisesta oma email. Saadame sulle repo lingi. Failid on saadaval seal</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputControl type={"text"}
                              error={errors.email?.message?.toString()}
                              register={register}
                              label={"Your email"}
                              name={"email"}></InputControl>

                <div className="d-inline">
                    <ButtonSmaller
                        type="submit"
                        className="mt-2 p-2 w-25">
                        Saada
                    </ButtonSmaller>
                    <ButtonSmaller
                        type="button"
                        className=" m-2 p-2 w-25"
                        onClick={() => close!()}>
                        Tagasi
                    </ButtonSmaller>
                </div>
            </form>


        </div></>
    );
};