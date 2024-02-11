import Lottie from "lottie-react";
import animationData from "../../assets/lottieAnimations/done_check.json";
import {FC, useEffect} from "react";

interface IProps{
    scroll: boolean;
}

export const SuccessAlert = ({scroll = true}) => {

    useEffect(() => {
        if(scroll){
            document.getElementById('success')!.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }

    }, []);

    return (

        <div id={"success"} className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-25">
                <Lottie animationData={animationData}/>
            </div>
        </div>

    );
};