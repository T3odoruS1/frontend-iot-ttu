import {FC, useEffect, useRef, useState} from "react";
import ButtonSmaller from "./ButtonSmaller";
import {useTranslation} from "react-i18next";

interface IProps {
    action: () => void;
    displayText: string;
    buttonText: string;
}
const ActionConfirmationAlert: FC<IProps> = ({action, displayText, buttonText}) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const closePopup = () => {
        setConfirmDelete(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && popupRef.current.isEqualNode(event.target as Node)) {
            closePopup();
        }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closePopup();
        }
    };

    useEffect(() => {
        if (confirmDelete) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = "hidden";
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = "auto";
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [confirmDelete]);

    const {t} = useTranslation();

    if (confirmDelete) {
        return (
            <div
                ref={popupRef}
                className={"popup"}
                >
                <div className="card_custom_form p-5" >
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
                        className="btn_custom_out w-25 align-self-center"
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