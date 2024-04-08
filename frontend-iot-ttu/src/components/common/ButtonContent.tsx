import {FC} from "react";
import Show from "./Show";
import {ButtonLoad} from "../lottie/ButtonLoad";

interface IProps{
    content: any
    isLoading?: boolean;
}

const ButtonContent: FC<IProps> = ({isLoading = false, content}) => {
    return (
        <Show>
            <Show.When isTrue={!isLoading}>{content}</Show.When>
            <Show.Else>
                <div className={"d-flex justify-content-center align-content-center"}>
                    <ButtonLoad/>
                </div>

            </Show.Else>
        </Show>
    );
}

export default ButtonContent;