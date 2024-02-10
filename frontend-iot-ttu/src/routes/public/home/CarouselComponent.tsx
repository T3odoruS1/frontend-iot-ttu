import React, {useState, useEffect, FC} from 'react';
import hall from './../../../assets/ttu-hall.jpeg'
import copter from './../../../assets/ttu-copter-shot.jpg'
import territory from './../../../assets/ttu-territory.jpeg'
import {BannerService} from "../../../services/BannerService";
import useFetch from "../../../hooks/useFetch";
import {IBanner} from "../../../dto/banner/IBanner";
import i18n from "i18next";
import {Loader} from "../../../components/Loader";

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
                key={index}
                heading={b.title}
                content={b.body}/>
        })
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
            }, 3000); // Slide transition every 3 seconds

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

    return (
        <div
            className="banner-container"
            data-ride="carousel"
            style={backgroundStyle}
        >
            {pending && <Loader/>}
            {banners && banners.length > 0 && (
                <BannerContent
                    key={banners[index].id} // Assuming each banner has a unique 'id' field
                    heading={banners[index].title}
                    content={banners[index].body}
                />
            )}
        </div>

    );
};

export default CarouselComponent;

const BannerContent: FC<{heading: string, content: string}> = ({heading, content}) => {
    return <div className="">
        <div className="carousel-item active text-center animated-text">
            <h1 className={"text-white home-page-title underline-last-line"}>{heading}</h1>
            <br/>
            <h4 className={"text-white home-page-subtitle"} >{content}</h4>
        </div>
    </div>
};
