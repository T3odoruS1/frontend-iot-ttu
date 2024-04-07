import {PartnerImageService} from "../../../../services/PartnerImageService";
import useFetch from "../../../../hooks/useFetch";
import {IPartnerImage} from "../../../../dto/partnerImage/IPartnerImage";
import React, {FC, useState} from "react";
import Popup from "../../../../components/Popup";
import {FieldValues, useForm} from "react-hook-form";
import {Form, Table} from "react-bootstrap";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import ImageUploader from "../../../../components/form/ImageUpload";
import {IPartnerImageOutput} from "../../../../dto/partnerImage/IPartnerImageOutput";
import {useTranslation} from "react-i18next";
import InputControl from "../../../../components/form/InputControl";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import add from "../../../../assets/iconpack/add.svg"
import removeIcon from "../../../../assets/iconpack/delete.svg"

export const PartnerImageEditMode = () => {
    const service = new PartnerImageService();
    const {data: images, pending, error, setData, fetchData} =
        useFetch<IPartnerImage[]>(service.getAll);
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(false);

    const remove = (id: string) => {
        service.delete(id).then(r => {
            setMessage("Removed");
            fetchData();
        }).catch(e => {
            setMessage("Error occurred")
        }).finally(() => {
            setTimeout(() => {
                setMessage("")
            }, 5000)
        })
    }

    const onSubmit = (fieldValues: FieldValues) => {
        service.create(fieldValues as IPartnerImageOutput).then(r => {
            setMessage("common.added")
            fetchData();
        }).catch(e => {
            setMessage("common.error")
        }).finally(() => {
            setTimeout(() => {
                setMessage("")
            }, 5000)
        })
    }

    const {t} = useTranslation();
    return (
        <>
            <Popup cname={"icon-wrapper"} trigger={
                    <img className={"icon-wrapper mb-2"}
                         alt={"Add"}
                         src={add}/>
            } content={
                <AddPartnerImage message={t(message)} onSubmit={onSubmit}/>
            }/>
            <Table>
                <tbody>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </Table>
            <Table>
                <tbody>
                {images?.map(i => {
                    return <tr className={"w-100"}>
                        <td>
                            <img className={"partner-image"} src={i.image} alt={"Partner image"}/>
                        </td>

                        <td><img className={"icon-wrapper mb-2"}
                                 onClick={() => remove(i.id)}
                                 alt={"Delete"}
                                 src={removeIcon}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </Table>
        </>
    );
};


interface PIProps {
    message?: string;
    onSubmit: (fieldValues: FieldValues) => void
}

const schema = yup.object().shape({
    image: yup.string().required(),
    link: yup.string().url().required()
})

export const AddPartnerImage = (props: PIProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm<{ image: string, link: string }>({resolver: yupResolver(schema)});

    const {t} = useTranslation();
    return <div className={"create-partner-image"}>
        <Form onSubmit={handleSubmit(props.onSubmit)}>
            {props.message}
            <ImageUploader register={register}
                           setValue={setValue}
                           getValue={getValues}
                           name={"image"}
                           label={"Image"}
                           fileSize={1}/>

            <div className="mt-2">
                <InputControl
                    name={`link`}
                    register={register}
                    type="text"
                    error={t(errors?.link?.message?.toString())}
                    label={t("partners.link")}
                />
            </div>

            <div className={"my-2"}>
                <ButtonPrimary type={"submit"}>
                    {t("common.submit")}
                </ButtonPrimary>
            </div>
        </Form>
    </div>
}