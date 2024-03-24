import {PartnerImageService} from "../../../../services/PartnerImageService";
import useFetch from "../../../../hooks/useFetch";
import {IPartnerImage} from "../../../../dto/partnerImage/IPartnerImage";
import React, {useState} from "react";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import Popup from "../../../../components/Popup";
import {FieldValues, useForm} from "react-hook-form";
import {Form} from "react-bootstrap";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import ImageUploader from "../../../../components/form/ImageUpload";
import {IPartnerImageOutput} from "../../../../dto/partnerImage/IPartnerImageOutput";
import {useTranslation} from "react-i18next";
import InputControl from "../../../../components/form/InputControl";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


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
            <p>{t(message)}</p>
            <Popup trigger={<ButtonSmaller>{t("common.new")}</ButtonSmaller>} content={<AddPartnerImage onSubmit={onSubmit}/>}/>
            {images?.map(i => {
                return <div className={"w-100"}>
                    <img className={"partner-image"} src={i.image} alt={"Partner image"}/>
                    <ButtonSmaller onClick={() => remove(i.id)}>{t("common.delete")}</ButtonSmaller>
                </div>
            })}
        </>
    );
};


interface PIProps {
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