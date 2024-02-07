import TopicAreaElement from "../../routes/public/news/list/TopicAreaElement";
import {FC, useEffect, useState} from "react";
import {ITopicAreaWithChildren} from "../../dto/topicarea/ITopicAreaWithChildren";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import useFetch from "../../hooks/useFetch";
import {TopicAreaService} from "../../services/TopicAreaService";

interface IProps {
    onTopicAreaChange: (newTopicArea: string | null) => void
}

const FilterBox: FC<IProps> = ({onTopicAreaChange, ...rest}) => {
    const {t} = useTranslation();
    const service = new TopicAreaService();
    const {data: topicAreas, pending: tPending} =
        useFetch<ITopicAreaWithChildren[]>(service.getAll, [i18n.language]);

    const isInitiallyMobile = window.innerWidth < 768;

    const [selected, setSelected] = useState(!isInitiallyMobile);
    const [mobile, setMobile] = useState(isInitiallyMobile);


    useEffect(() => {
        const handleResize = () => {
            const isMobileNow = window.innerWidth < 768;

            if (mobile !== isMobileNow) {
                setMobile(isMobileNow);
                setSelected(!isMobileNow);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mobile]);


    return (
        <div className={`filter_box ${!selected ? "clickable-pointer" : ""}  ${mobile ? "mb-2" : ""}`}>
            {tPending && <p>Loading...</p>}

            <div className={"filter_header w-100"}>
                <h3 onClick={() => {
                    setSelected(!selected)
                }} className="w-100 header-pink unselectable m-0">
                    {t("public.news.filters")}
                </h3>
            </div>
            {selected && <ul className={`p-0 ${selected ? "open" : ""}`}>
                {topicAreas
                    ?.sort((a, b) => {
                        let nameA = a.name.toLowerCase();
                        let nameB = b.name.toLowerCase();

                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        return 0;
                    })
                    .map((topicArea) => {
                        return (<TopicAreaElement
                                topicArea={topicArea}
                                onTopicAreaChange={onTopicAreaChange}
                            />

                        );
                    })}
            </ul>}
        </div>
    );
};

export default FilterBox;