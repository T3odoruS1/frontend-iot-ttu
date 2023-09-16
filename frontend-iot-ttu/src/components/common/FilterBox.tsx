import TopicAreaElement from "../../routes/public/news/list/TopicAreaElement";
import {Col} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {ITopicAreaWithChildren} from "../../dto/topicarea/ITopicAreaWithChildren";

const FilterBox: FC<{ topicAreas: ITopicAreaWithChildren[] }> = ({topicAreas, ...rest}) => {
    const [selected, setSelected] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSelected(false);
            } else {
                setSelected(true);
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
        <Col className="filter-box px-md-4 col-md-2 order-md-1 order-0">
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
                            name={topicArea.name}
                            childrenTopicAreas={topicArea.childrenTopicAreas}
                            id={topicArea.id}
                        />
                    );
                })}
            </ul>}
        </Col>
    );
};

export default FilterBox;