import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {IPageContent} from "../../../dto/pageContent/IPageContent";
import {useState} from "react";
import {EditablePageEditor} from "../../admin/editablePage/EditablePageEditor";
import {EditablePageContent} from "./EditablePageContent";

interface IProps {
    pageIdentifier: string,
}

const EditablePage = (props: IProps) => {

    const [editModeEnabled, setEditModeEnabled] = useState(false)

    if (editModeEnabled) {
        return <div><EditablePageEditor pageIdentifier={props.pageIdentifier}/><ButtonPrimary onClick={() =>
            setEditModeEnabled(!editModeEnabled)}>Toggle edit</ButtonPrimary></div>
    }

   return <>
        <EditablePageContent pageIdentifier={props.pageIdentifier}/> <ButtonPrimary onClick={() =>
        setEditModeEnabled(!editModeEnabled)}>Toggle edit</ButtonPrimary>
    </>


};

export default EditablePage;