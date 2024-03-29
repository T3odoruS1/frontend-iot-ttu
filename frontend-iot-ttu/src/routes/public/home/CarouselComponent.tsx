import React, {useState, useEffect, FC} from 'react';
import {BannerService} from "../../../services/BannerService";
import useFetch from "../../../hooks/useFetch";
import {IBanner} from "../../../dto/banner/IBanner";
import i18n from "i18next";
import {Loader} from "../../../components/Loader";
import Show from "../../../components/common/Show";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import {useTranslation} from "react-i18next";

const CarouselComponent = () => {

    const service = new BannerService();
    const {data: banners, error, pending, setData} =
        useFetch<IBanner[]>(service.getAll, [i18n.language])
    const [index, setIndex] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const backgrounds = banners?.map(b => b.image);

    const [contents, setContents] = useState<JSX.Element[]>([]);


    useEffect(() => {
        const cont = banners?.map((b, index) => {
            return <BannerContent
                banner={b}/>
        }) ?? []
        setContents(cont ?? [])

        if(backgrounds !== undefined){
            const handleScroll = () => {
                setOffsetY(window.scrollY);
            };



            if(!document.body.classList.contains("safari")){

                window.addEventListener('scroll', handleScroll);
            }

            const intervalId = setInterval(() => {
                setIndex((prevIndex) => (prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1));
            }, 5000); // Slide transition every 3 seconds

            return () => {
                clearInterval(intervalId);
                window.removeEventListener('scroll', handleScroll);
        }

        }
    }, [backgrounds?.length, banners, i18n.language]);


    const parallaxSpeed =-0.25;

    const backgroundStyle = {
        backgroundImage: `url(${backgrounds?.[index]})`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${offsetY * parallaxSpeed}px`};

    if(!document.body.classList.contains("safari")){
        backgroundStyle.backgroundPosition = `center`
    }


    return <Show>
        <Show.When isTrue={banners && banners[index] && banners.length > 0}>
            <div
                className="banner-container"
                data-ride="carousel"
                style={backgroundStyle}>
                {contents[index]}
            </div>
        </Show.When>
        {/*<Show.Else><Loader/></Show.Else>*/}
    </Show>


};

export default CarouselComponent;

const BannerContent: FC<{ banner: IBanner }> = ({banner}) => {

    const {t} = useTranslation()
    const scrollToContent = () => {
        let elementPosition = document.getElementById("home-page-content")?.getBoundingClientRect()?.top! - 100;
        window.scroll({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    return <div>
        <div className="carousel-item active text-center animated-text p-2">
            <h1 className={"text-white home-page-title underline-last-line"}>{banner.title}</h1>
            <br/>
            <h4 className={"text-white home-page-subtitle mb-2"} >{banner.body}</h4>

            {/*<ButtonSmaller onClick={scrollToContent}>{t("common.lookCloser")}</ButtonSmaller>*/}
        </div>
    </div>
};
