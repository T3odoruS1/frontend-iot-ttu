import {useContext, useEffect, useState} from "react";
import {JwtContext} from "../../../Root";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {PartnerImageDisplay} from "./PartnerImageDisplay";
import {PartnerImageEditMode} from "./PartnerImageEditMode";
import {useTranslation} from "react-i18next";
import edit from "../../../../assets/iconpack/edit.svg";

export const PartnerImages = () => {
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);
    const {t} = useTranslation();
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if(!jwtResponseCtx?.jwt){
            setEditMode(false);
        }
    }, [jwtResponseCtx]);

    if(editMode){
        return <>
            <PartnerImageEditMode/>
            <br/>
            <img className={"icon-wrapper mb-2"}
                 onClick={() => setEditMode(!editMode)}
                 alt={"Edit"}
                 src={edit}/></>
    }

    return (
        <>
            <PartnerImageDisplay/>
            <br/>
            {jwtResponseCtx?.jwt &&

                <img className={"icon-wrapper mb-2"}
                     onClick={() => setEditMode(!editMode)}
                     alt={"Delete"}
                     src={edit}/>
            }
        </>
    );
};