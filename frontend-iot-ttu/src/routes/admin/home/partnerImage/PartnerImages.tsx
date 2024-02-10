import {useContext, useState} from "react";
import {JwtContext} from "../../../Root";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {PartnerImageDisplay} from "./PartnerImageDisplay";
import {PartnerImageEditMode} from "./PartnerImageEditMode";
import {useTranslation} from "react-i18next";

export const PartnerImages = () => {
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);
    const {t} = useTranslation();
    const [editMode, setEditMode] = useState(false)

    if(editMode){
        return <>
            <PartnerImageEditMode/>
            <br/>
            <ButtonPrimary onClick={() =>
                setEditMode(!editMode)}>{t("common.toggleEdit")}
            </ButtonPrimary></>
    }

    return (
        <>
            <PartnerImageDisplay/>
            <br/>
            {jwtResponseCtx?.jwt &&

                <ButtonPrimary onClick={() =>
                    setEditMode(!editMode)}>{t("common.toggleEdit")}
                </ButtonPrimary>}</>
    );
};