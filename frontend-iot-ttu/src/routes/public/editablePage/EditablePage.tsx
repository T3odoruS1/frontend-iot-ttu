import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {IPageContent} from "../../../dto/pageContent/IPageContent";
import {useContext, useState} from "react";
import {EditablePageEditor} from "../../admin/editablePage/EditablePageEditor";
import {EditablePageContent} from "./EditablePageContent";
import {JwtContext} from "../../Root";

interface IProps {
    pageIdentifier: string,
    showTitle: boolean,
}

const EditablePage = (props: IProps) => {
    const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);


    const [editModeEnabled, setEditModeEnabled] = useState(false)

    if (editModeEnabled) {
        return <div>
            <EditablePageEditor pageIdentifier={props.pageIdentifier}/>
            <ButtonPrimary onClick={() =>
                setEditModeEnabled(!editModeEnabled)}>Toggle edit
            </ButtonPrimary>
        </div>
    }

    return <>
        <EditablePageContent showTitle={props.showTitle} pageIdentifier={props.pageIdentifier}/>

        {jwtResponseCtx?.jwt &&
            <ButtonPrimary onClick={() =>
                setEditModeEnabled(!editModeEnabled)}>Toggle edit
            </ButtonPrimary>}

    </>


};

export default EditablePage;