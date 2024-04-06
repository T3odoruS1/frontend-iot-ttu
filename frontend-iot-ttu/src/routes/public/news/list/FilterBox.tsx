import {FC, useEffect, useState} from "react";
import {useCollapse} from "react-collapsed";
import {useTranslation} from "react-i18next";
import useFetch from "../../../../hooks/useFetch";
import {TopicAreaService} from "../../../../services/TopicAreaService";
import dropdownIcon from "../../../../assets/iconpack/Dropdown Arrow Icon.svg"
import {useLocation} from "react-router-dom";
import Show from "../../../../components/common/Show";
import {Loader} from "../../../../components/Loader";
import {ITopicAreaWithCount} from "../../../../dto/topicarea/ITopicAreaWithCount";

interface IProps {
    onTopicAreaChange: (newTopicArea: string | null) => void;
}

const FilterBox: FC<IProps> = ({onTopicAreaChange}) => {
    const {t, i18n} = useTranslation();
    const service = new TopicAreaService();
    const {data: topicAreas, pending: tPending} = useFetch<ITopicAreaWithCount[]>(service.getAll, [i18n.language]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const isInitiallyMobile = window.innerWidth < 768;
    const [isExpanded, setExpanded] = useState(!isInitiallyMobile);
    const [mobile, setMobile] = useState(isInitiallyMobile);
    const duration = 1000;
    const {getToggleProps, getCollapseProps} = useCollapse({isExpanded, duration});

    const isSelected = (id?: string) => {
        if(!id && !searchParams.has("topicArea")){
            return true;
        }
        return searchParams.has("topicArea") && searchParams.get("topicArea") === id;
    }


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
        <div className={`${!isExpanded ? "clickable-pointer" : ""} ${mobile ? "mb-2" : ""}`}>
            {tPending && <Loader/>}

            <Show>
                <Show.When isTrue={mobile}>
                    <div {...getToggleProps({
                        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                    })}>
                        <h1 className="w-100 unselectable ms-md-3 ms-0 mb-2">
                            {t("public.news.filters")}

                            <img
                                alt={"dropdown"}
                                src={dropdownIcon}
                                className={`${isExpanded ? 'expanded-collapse-arrow' : 'collapse-arrow'} icon`}
                            />


                        </h1>
                    </div>
                </Show.When>
                <Show.Else>
                    <h1 className="w-100 unselectable ms-md-4 ps-md-1 ms-0 mb-2">
                        {t("public.news.filters")}
                    </h1>
                </Show.Else>
            </Show>
            <div className={"m-0 p-0"} {...getCollapseProps()}>
                <h4 key="1233"
                    className={isSelected() ? "post-category-active" : "post-category"}
                    onClick={() => {
                        onTopicAreaChange(null)
                    }}>
                    All categories
                </h4>
                {topicAreas?.map((topicArea) => (
                    <Show key={topicArea.id}>
                        <Show.When isTrue={topicArea.count !== 0}>
                            <h4 key={topicArea.id}
                                className={isSelected(topicArea.id) ? "post-category-active clickable-pointer" : "post-category clickable-pointer"}
                                onClick={() => {
                                    onTopicAreaChange(topicArea.id)
                                }}>
                                {topicArea.name}
                            </h4>
                        </Show.When>
                    </Show>
                ))}

            </div>
        </div>
    );
};

export default FilterBox;
