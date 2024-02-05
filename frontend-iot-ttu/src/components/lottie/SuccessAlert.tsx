import Lottie from "lottie-react";
import animationData from "../../assets/lottieAnimations/done_check.json";
import {useEffect} from "react";

export const SuccessAlert = () => {

    useEffect(() => {
        document.getElementById('success')!.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }, []);

    return (

        <div id={"success"} className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-25">
                <Lottie animationData={animationData}/>
            </div>
        </div>

    );
};