import React, {useState, useEffect, FC} from 'react';
import hall from './../../../assets/ttu-hall.jpeg'
import copter from './../../../assets/ttu-copter-shot.jpg'
import territory from './../../../assets/ttu-territory.jpeg'

const CarouselComponent = () => {
    const [index, setIndex] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const backgrounds = [
        hall,
        copter,
        territory,
    ];

    const contents = [
        <BannerContent
            key={0}
            heading={"Embedded AI Research Lab"}
            content={"Tallinn University of Technology"}/>,
        <BannerContent
            key={1}
            heading={"You have an idea to develop?"}
            content={"Check out our references and services"}/>,
        <BannerContent
            key={2}
            heading={"Looking for cooperation possibilities?"}
            content={"Optimize your machine learning algorithm for speed, memory or power consumption"}/>
    ]

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);


        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1));
        }, 3000); // Slide transition every 3 seconds

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('scroll', handleScroll);
        }
    }, [backgrounds.length]);


    const parallaxSpeed =-0.25;

    const backgroundStyle = {
        backgroundImage: `url(${backgrounds[index]})`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${offsetY * parallaxSpeed}px`};

    return (
        <div
            className="banner-container"
            data-ride="carousel"
            style={backgroundStyle}
        >
            {contents[index]}
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
