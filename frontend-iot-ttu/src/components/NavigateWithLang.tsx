import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import i18n from "i18next";

interface IProps {
    to: string;
}

const NavigateWithLang = (props : IProps) => {
    return <Navigate to={`${i18n.language}/${props.to}`} />
}

export default NavigateWithLang;