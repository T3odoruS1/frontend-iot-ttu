import Lottie from "lottie-react";
import aimation from "../../assets/lottieAnimations/Animation 1712256776816.json"

export const ButtonLoad = () => {
    return (
        <div className={"button-loader d-flex justify-content-center align-content-center"}>
            <Lottie animationData={aimation}/>
        </div>
    );
};