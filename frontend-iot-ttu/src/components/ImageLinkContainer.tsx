import {FC} from "react";
import {useNavigate} from "react-router-dom";

interface IProps{
    image: string;
    to: string;
    label: string;
}

export const ImageLinkContainer: FC<IProps> = ({image, to, label}) => {
    const navigate = useNavigate();

    const onImageClick = () => {
        navigate(to);
    }
    return (
        <div onClick={onImageClick} className="image-link" style={{backgroundImage: `url(${image})`, backgroundSize: "cover"}}>
            <div className="image-link-label">{label} <span className="link-arrow">→</span></div>
        </div>
    );
};