import {ITopicAreaGet} from "../dto/topicarea/ITopicAreaGet";

export const getTopicAreasAsStr = (topicAreas: ITopicAreaGet[]) => {
    const names: string[] = []
    topicAreas.map((area) => {
        names.push(area.name);
    })
    return names.join(", ")
}