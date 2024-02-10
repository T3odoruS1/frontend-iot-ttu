import {useContext, useState} from "react";
import {JwtContext} from "../../../Root";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {PartnerImageDisplay} from "./PartnerImageDisplay";
import {PartnerImageEditMode} from "./PartnerImageEditMode";

export const PartnerImages = () => {
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);

    const [editMode, setEditMode] = useState(false)

    if(editMode){
        return <>
            <PartnerImageEditMode/>
            <br/>
            <ButtonPrimary onClick={() =>
                setEditMode(!editMode)}>Toggle edit
            </ButtonPrimary></>
    }

    return (
        <>
            <PartnerImageDisplay/>
            <br/>
            {jwtResponseCtx?.jwt &&

                <ButtonPrimary onClick={() =>
                    setEditMode(!editMode)}>Toggle edit
                </ButtonPrimary>}</>
    );
};