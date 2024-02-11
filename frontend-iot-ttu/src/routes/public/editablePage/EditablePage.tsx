import ButtonPrimary from "../../../components/common/ButtonPrimary";
import {useContext, useState} from "react";
import {EditablePageEditor} from "../../admin/editablePage/EditablePageEditor";
import {EditablePageContent} from "./EditablePageContent";
import {JwtContext} from "../../Root";
import {useTranslation} from "react-i18next";

interface IProps {
    pageIdentifier: string,
    showTitle: boolean,
}

const EditablePage = (props: IProps) => {
    const {jwtResponseCtx} = useContext(JwtContext);
    const {t} = useTranslation();

    const [editModeEnabled, setEditModeEnabled] = useState(false)

    if (editModeEnabled) {
        return <div>
            <EditablePageEditor pageIdentifier={props.pageIdentifier}/>
            <ButtonPrimary onClick={() =>
                setEditModeEnabled(!editModeEnabled)}>{t('common.toggleEdit')}
            </ButtonPrimary>
        </div>
    }

    return <>
        <EditablePageContent showTitle={props.showTitle} pageIdentifier={props.pageIdentifier}/>

        {jwtResponseCtx?.jwt &&
            <ButtonPrimary onClick={() =>
                setEditModeEnabled(!editModeEnabled)}>{t('common.toggleEdit')}
            </ButtonPrimary>}

    </>


};

export default EditablePage;