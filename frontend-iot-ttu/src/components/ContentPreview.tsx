import NewsContent from "./NewsContent";
import {INewsOutputDTO} from "../dto/news/INewsOutputDTO";
import placeholder from "../assets/placeholder.webp"
import i18n from 'i18next';
import {ITopicAreaGet, ITopicAreaGetMultilang} from "../dto/topicarea/ITopicAreaGet";

interface IProps {
    formValues: INewsOutputDTO;
    topicAreas: ITopicAreaGetMultilang[];
}


const ContentPreview = (props: IProps) => {
    const getContent = (value: string | undefined, def: string) => {
        if (value !== undefined && value.length > 0) {
            return value;
        }
        return def;
    }

    const getImage = (imageContent: string) => {
        if (imageContent !== undefined && imageContent && imageContent.length > 0) {
            return imageContent;
        }
        return placeholder;
    }

    function flattenTopics(topics:ITopicAreaGetMultilang[]): ITopicAreaGetMultilang[] {
        let flatList: ITopicAreaGetMultilang[] = [];

        topics.forEach(topic => {
            flatList.push(topic);

            if (topic.childrenTopicAreas && topic.childrenTopicAreas.length) {
                flatList = flatList.concat(flattenTopics(topic.childrenTopicAreas));
            }
        });

        return flatList;
    }

    function translateTopicAreas(culture: string): ITopicAreaGet[] {
        if(props.formValues.topicAreas === undefined){
            return [];
        }
        return props.formValues?.topicAreas?.map(userTopic => {
            // Find the matching topic from allTopicAreas
            const matchingTopic = flattenTopics(props.topicAreas).find(topic => topic.id === userTopic.id)

            if (!matchingTopic) {
                // If there's no matching topic and the title is available, return the title as name, else empty string
                return {
                    id: userTopic.id,
                    name: userTopic.title || ''
                };
            }

            // Find the translation for the given culture
            const translation = matchingTopic.content.find(content => content.culture === culture);

            // If translation is found, return the TranslatedTopicArea with the translated name, otherwise return the title or an empty string
            return {
                id: userTopic.id,
                name: translation ? translation.value : userTopic.title || ''
            };
        });
    }

    return (
        <>
            <div className="d-inline-flex justify-content-center align-items-center w-100">
                <NewsContent
                    title={
                        i18n.language === "en"
                            ? (getContent(props.formValues?.title?.at(1)?.value, "No title"))
                            : (getContent(props.formValues?.title?.at(0)?.value, "Pealkirja ei ole"))
                    }
                    image={getImage(props.formValues.image)}
                    createdAt={new Date().toLocaleDateString()}
                    author={props.formValues.author}
                    content={
                        i18n.language === "et"
                            ? (props.formValues?.body?.at(1)?.value ?? "No content")
                            : (props.formValues?.body?.at(0)?.value ?? "Sisu ei ole")
                    }
                    topicAreas={translateTopicAreas(i18n.language)}
                />
            </div>
        </>
    );
};

export default ContentPreview;
