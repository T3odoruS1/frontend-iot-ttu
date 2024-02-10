import {FC, useEffect, useState} from "react";
import ButtonSmaller from "./ButtonSmaller";
import {useTranslation} from "react-i18next";

interface IProps {
    action: () => void;
    displayText: string;
    buttonText: string;
}
const ActionConfirmationAlert: FC<IProps> = ({action, displayText, buttonText}) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    useEffect(() => {
        if (confirmDelete) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [confirmDelete]);

    const {t} = useTranslation();

    if (confirmDelete) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: 'blur(25px)',

                    zIndex: 9999,
                }}>
                <div className="card_custom_form p-5">
                    <h2>{displayText}</h2>
                    <ButtonSmaller
                        type="button"
                        className="btn_custom_out m-2 w-25 align-self-center"
                        onClick={() => {
                            action();
                            setConfirmDelete(false);
                        }}>
                        {t("common.yes")}
                    </ButtonSmaller>
                    <ButtonSmaller
                        type="button"
                        className="btn_custom_out m-2 w-25 align-self-center"
                        onClick={() => setConfirmDelete(false)}>
                        {t("common.no")}
                    </ButtonSmaller>
                </div>
            </div>
        );
    }

    return (
        <ButtonSmaller
            type="button"
            onClick={() => setConfirmDelete(true)}>
            {buttonText}
        </ButtonSmaller>

    );
};

export default ActionConfirmationAlert;