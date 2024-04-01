import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {useContext, useEffect, useState} from "react";
import {EditablePageEditor} from "../../admin/editablePage/EditablePageEditor";
import {EditablePageContent} from "./EditablePageContent";
import {JwtContext} from "../../Root";
import {useTranslation} from "react-i18next";
import edit from "../../../assets/iconpack/edit.svg"

interface IProps {
    pageIdentifier: string,
    showTitle: boolean,
}

const EditablePage = (props: IProps) => {
    const {jwtResponseCtx} = useContext(JwtContext);
    const {t} = useTranslation();

    const [editModeEnabled, setEditModeEnabled] = useState(false)

    useEffect(() => {
        if(!jwtResponseCtx?.jwt){
            setEditModeEnabled(false);
        }
    }, [jwtResponseCtx]);

    if (editModeEnabled) {
        return <div>
            <EditablePageEditor pageIdentifier={props.pageIdentifier}/>

                <img className={"icon-wrapper mb-2"}
                     onClick={() => setEditModeEnabled(!editModeEnabled)}
                     alt={"Delete"}
                     src={edit}/>
        </div>
    }

    return <>
        <EditablePageContent showTitle={props.showTitle} pageIdentifier={props.pageIdentifier}/>

        {jwtResponseCtx?.jwt &&
            <img className={"icon-wrapper mb-2"}
                 onClick={() => setEditModeEnabled(!editModeEnabled)}
                 alt={"Delete"}
                 src={edit}/>
        }
    </>


};

export default EditablePage;