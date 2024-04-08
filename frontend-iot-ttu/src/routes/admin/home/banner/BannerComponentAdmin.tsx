import {IBanner} from "../../../../dto/banner/IBanner";
import {FC} from "react";

interface IProps {
    banner: IBanner
}

export const BannerComponentAdmin: FC<IProps> = (props: IProps) => {
    return (
        <div className={"mt-2 banner-preview d-flex justify-content-center align-content-center"} style={{
            backgroundImage: `url(${props.banner.image})`,
            backgroundSize: 'cover'
        }}>

            <div className={"d-flex flex-column justify-content-center align-content-center p-4"}>
                <h3 className={"text-white home-page-title pb-3 underline-last-line"}>{props.banner.title}</h3>
                <h4 className={"text-white home-page-subtitle"}>{props.banner.body}</h4>
            </div>

        </div>
    );
};