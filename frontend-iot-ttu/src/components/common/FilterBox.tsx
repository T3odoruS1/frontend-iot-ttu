import {FC, useEffect, useState} from "react";
import {useCollapse} from "react-collapsed";
import {useTranslation} from "react-i18next";
import useFetch from "../../hooks/useFetch";
import {TopicAreaService} from "../../services/TopicAreaService";
import TopicAreaElement from "../../routes/public/news/list/TopicAreaElement";
import {ITopicAreaWithChildren} from "../../dto/topicarea/ITopicAreaWithChildren";

interface IProps {
    onTopicAreaChange: (newTopicArea: string | null) => void;
}

const FilterBox: FC<IProps> = ({onTopicAreaChange}) => {
    const {t, i18n} = useTranslation();
    const service = new TopicAreaService();
    const {data: topicAreas, pending: tPending} = useFetch<ITopicAreaWithChildren[]>(service.getAll, [i18n.language]);

    const isInitiallyMobile = window.innerWidth < 768;
    const [isExpanded, setExpanded] = useState(!isInitiallyMobile);
    const [mobile, setMobile] = useState(isInitiallyMobile);

    const {getToggleProps, getCollapseProps} = useCollapse({isExpanded});

    useEffect(() => {
        console.log(isExpanded)
    }, [isExpanded]);

    useEffect(() => {
        const handleResize = () => {
            const isMobileNow = window.innerWidth < 768;
            if (mobile !== isMobileNow) {
                setMobile(isMobileNow);
                setExpanded(!isMobileNow);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobile]);

    return (
        <div className={`collapse-card p-2 ${!isExpanded ? "clickable-pointer" : ""} ${mobile ? "mb-2" : ""}`}>
            {tPending && <p>Loading...</p>}
            <div {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })} className={"filter_header w-100"}>
                <h3 className="w-100 header-pink unselectable m-0">
                    <span
                        className={isExpanded ? "expanded-collapse-arrow" : "collape-arrow"}>›
                    </span>
                    {t("public.news.filters")}
                </h3>
            </div>
            <ul className={"p-2"} {...getCollapseProps()}>
                {topicAreas?.map((topicArea) => (
                    <TopicAreaElement
                        key={topicArea.id} // Assuming each topicArea has a unique 'id'
                        topicArea={topicArea}
                        onTopicAreaChange={onTopicAreaChange}
                    />
                ))}

            </ul>
        </div>
    );
};

export default FilterBox;
