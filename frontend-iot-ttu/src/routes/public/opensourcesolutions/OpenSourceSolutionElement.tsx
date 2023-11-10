import {Card, Form, InputGroup} from "react-bootstrap";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import {IOpenSourceSolution} from "../../../dto/IOpenSourceSolution";
import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import InputControl from "../../../components/form/InputControl";
import {FieldValues, useForm} from "react-hook-form";
import {TitlePink} from "../../../components/common/TitlePink";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    email: yup.string().email(" - email should be valid").required(" - please input email")
});

interface IFormOutput {
    email: string;
}

export const OpenSourceSolutionElement: FC<{ data: IOpenSourceSolution }> = ({data}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<IFormOutput>({resolver: yupResolver(schema)});


    const [popUpOpen, setPopUpOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (popUpOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [popUpOpen]);

    const onSubmit = async (fieldValues: FieldValues) => {
        console.log(fieldValues);
        onSuccess();
    }

    const onSuccess = () => {
        setMessage("Link to repo sent to your email");

        setTimeout(() => {
            setPopUpOpen(false);
            setMessage("");
            setValue("email", "");
        }, 1000)
    }

    const onFail = () => {

    }

    useEffect(() => {
        console.log(errors)
    }, []);
    const ref = useRef(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                // Perform your action here.
                setPopUpOpen(false);
                // Example: If you want to focus on the referenced element
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    if (popUpOpen) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: 'blur(25px)',

                    zIndex: 9999,
                }}>

                <div className="git-popup p-5">
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
                            onClick={() => setPopUpOpen(false)}>
                            Tagasi
                        </ButtonSmaller>
                    </div>
                    </form>


                </div>
            </div>
        );
    }

    return (
        <>
            <Card onClick={() => {
                setPopUpOpen(true);
            }} className='my-2 git-style-card p-4'>
                <SubHeadingPurple>{data.title}</SubHeadingPurple>
                <p>{data.description}</p>
                <div className={"text-pink-main"}>{data.topicAreas.flatMap(v => v.name).join(", ")}</div>
            </Card>
        </>
    );
};

/*
const [confirmDelete, setConfirmDelete] = useState(false);
    useEffect(() => {
        if (confirmDelete) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [confirmDelete]);


    if (confirmDelete) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: 'blur(25px)',

                    zIndex: 9999,
                }}>
                <div className="card_custom_form p-5">
                    <h2>{displayText}</h2>
                    <ButtonSmaller
                        type="button"
                        className="btn_custom_out m-2 w-25 align-self-center"
                        onClick={() => {
                            action();
                            setConfirmDelete(false);
                        }}>
                        Yes
                    </ButtonSmaller>
                    <ButtonSmaller
                        type="button"
                        className="btn_custom_out m-2 w-25 align-self-center"
                        onClick={() => setConfirmDelete(false)}>
                        No
                    </ButtonSmaller>
                </div>
            </div>
        );
    }

    return (
        <ButtonSmaller
            type="button"
            onClick={() => setConfirmDelete(true)}>
            {buttonText}
        </ButtonSmaller>

    );
 */