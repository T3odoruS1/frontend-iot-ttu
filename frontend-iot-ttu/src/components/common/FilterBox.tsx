import TopicAreaElement from "../../routes/public/news/list/TopicAreaElement";
import {Col} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {ITopicAreaWithChildren} from "../../dto/topicarea/ITopicAreaWithChildren";
import useTopicAreas from "../../hooks/useTopicAreas";
import i18n from "i18next";

const FilterBox: FC = ({...rest}) => {
    const [selected, setSelected] = useState(window.innerWidth >= 768);
    const [mobile, setMobile] = useState(window.innerWidth >= 768);
    const {topicAreas, pending: tPending} = useTopicAreas();
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSelected(false);
                setMobile(false)
            } else {
                setSelected(true);
                setMobile(true);
            }
        };

        // Attach the resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);  // Empty dependency array to ensure this effect runs only on mount and unmount

    return (
        <div>
            {tPending && <p>Loading...</p>}
            <h3 onClick={() => {
                setSelected(!selected)
            }} className="header-pink">Filters
                <span
                    className="dropdown-icon">{selected ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}</span>
            </h3>
            {selected && <ul className="p-0">
                {topicAreas.map((topicArea) => {
                    return (
                        <TopicAreaElement
                            key={topicArea.id}
                            name={topicArea.name}
                            childrenTopicAreas={topicArea.childrenTopicAreas}
                            id={topicArea.id}
                        />
                    );
                })}
            </ul>}
            {!mobile && <hr/>}
        </div>
    );
};

export default FilterBox;