import {TopicAreaService} from "../services/TopicAreaService";
import {useEffect, useState} from "react";
import {ITopicAreaWithChildren} from "../dto/topicarea/ITopicAreaWithChildren";
import i18n from "i18next";

const useTopicAreas = () => {
    const service = new TopicAreaService();
    const [topicAreas, setTopicAreas] = useState<ITopicAreaWithChildren[]>([]);
    const [pending, setPending] = useState(true);

    const fetch = () => {
        service.getAll(i18n.language).then((result) => {
                if (result !== undefined) {
                    setTopicAreas(result);

                }
                setPending(false);
            })
    }


    useEffect(() => {
        fetch();
    }, [i18n.language]);

    return {topicAreas, pending}
}

export default useTopicAreas;