import {TopicAreaService} from "../services/TopicAreaService";
import {useEffect, useState} from "react";
import {ITopicAreaWithChildren} from "../dto/topicarea/ITopicAreaWithChildren";
import i18n from "i18next";

const useTopicAreas = () => {
    const service = new TopicAreaService();
    const [topicAreas, setTopicAreas] = useState<ITopicAreaWithChildren[]>([]);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = () => {
        service.getAll(i18n.language)
            .then(setTopicAreas)
            .catch(setError)
            .finally(() => setPending(false))
    }


    useEffect(() => {
        fetch();
    }, [i18n.language]);

    return {topicAreas, pending, error}
}

export default useTopicAreas;