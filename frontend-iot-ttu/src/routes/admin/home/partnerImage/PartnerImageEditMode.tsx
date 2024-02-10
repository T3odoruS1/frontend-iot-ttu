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
            setMessage("Added")
            fetchData();
        }).catch(e => {
            setMessage("Error occurred")
        }).finally(() => {
            setTimeout(() => {
                setMessage("")
            }, 5000)
        })
    }

    return (
        <>
            <p>{message}</p>
            <Popup trigger={<ButtonSmaller>Add new</ButtonSmaller>} content={<AddPartnerImage onSubmit={onSubmit}/>}/>
            {images?.map(i => {
                return <div className={"w-100"}>
                    <img className={"partner-image"} src={i.image} alt={"Partner image"}/>
                    <ButtonSmaller onClick={() => remove(i.id)}>Delete</ButtonSmaller>
                </div>
            })}
        </>
    );
};


interface PIProps {
    onSubmit: (fieldValues: FieldValues) => void
}

export const AddPartnerImage = (props: PIProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues
    } = useForm<{ image: string }>();


    return <div className={"create-partner-image"}>
        <Form onSubmit={handleSubmit(props.onSubmit)}>

            <ImageUploader register={register}
                           setValue={setValue}
                           getValue={getValues}
                           name={"image"}
                           label={"Image"}
                           fileSize={1}/>

            <div className={"my-2"}>
                <ButtonPrimary type={"submit"}>
                    Submit
                </ButtonPrimary>
            </div>
        </Form>
    </div>
}