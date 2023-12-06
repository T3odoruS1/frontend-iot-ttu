import TopicAreaElement from "../../routes/public/news/list/TopicAreaElement";
import {Col} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {ITopicAreaWithChildren} from "../../dto/topicarea/ITopicAreaWithChildren";
import useTopicAreas from "../../hooks/useTopicAreas";
import i18n from "i18next";

const FilterBox: FC = ({...rest}) => {

    const {topicAreas, pending: tPending} = useTopicAreas();

    // Initially check if we're in mobile view
    const isInitiallyMobile = window.innerWidth < 768;

    // Set initial states based on the window width
    const [selected, setSelected] = useState(!isInitiallyMobile);
    const [mobile, setMobile] = useState(isInitiallyMobile);

    // ... other state and context

    useEffect(() => {
        const handleResize = () => {
            const isMobileNow = window.innerWidth < 768;

            // Check if the mobile state has changed
            if (mobile !== isMobileNow) {
                setMobile(isMobileNow);

                // Change selected only if there is a state change
                setSelected(!isMobileNow);
            }
        };

        // Attach the resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mobile]); // Depend on the mobile state

    // ... your component render logic

    return (
        <div className={`filter_box ${mobile ? "mb-2" : ""}`}>
            {tPending && <p>Loading...</p>}
            <h3 onClick={() => {
                setSelected(!selected)
            }} className="header-pink m-0">Filters
            </h3>
            {selected && <ul className="p-0">
                {topicAreas
                    .sort((a, b) => {
                        let nameA = a.name.toLowerCase(); // convert to lowercase for case-insensitive comparison
                        let nameB = b.name.toLowerCase();

                        if (nameA < nameB) {
                            return -1; // nameA comes first
                        }
                        if (nameA > nameB) {
                            return 1; // nameB comes first
                        }

                        return 0; // names are equal
                    })
                    .map((topicArea) => {
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
        </div>
    );
};

export default FilterBox;