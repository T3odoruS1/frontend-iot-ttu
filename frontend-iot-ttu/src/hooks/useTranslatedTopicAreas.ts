import {useState} from "react";
import {ITopicAreaGetMultilang} from "../dto/topicarea/ITopicAreaGetMultilang";
import {TopicAreaService} from "../services/TopicAreaService";

const useTranslatedTopicAreas = () => {
    const [topicAreas, setTopicAreas] =
        useState<ITopicAreaGetMultilang[]>([]);
    const [pending, setPending] = useState(true);
    const service = new TopicAreaService();
    const fetch = () => {
        service.getWithTranslations().then((result) => {
            if(result !== undefined){
                setTopicAreas(result);
            }
            setPending(false);
        })
    }
    return {topicAreas, pending}
}

export default useTranslatedTopicAreas;