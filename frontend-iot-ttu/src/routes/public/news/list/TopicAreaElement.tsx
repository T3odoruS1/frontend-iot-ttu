import {Link, useLocation} from "react-router-dom";
import {ITopicAreaGet} from "../../../../dto/topicarea/ITopicAreaGet";

interface IProps {
    topicArea: ITopicAreaGet,
    onTopicAreaChange: (newTopicArea: string | null) => void
}

const TopicAreaElement = (props: IProps) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const truncate = (str: string, len: number) => {
        return str.length > len ? str.substring(0, len - 3) + "..." : str;
    }

    const isSelected = (id: string) => {
        return searchParams.has("topicArea") && searchParams.get("topicArea") === id;
    }

    return (
        <li>
            <div onClick={() => props.onTopicAreaChange(props.topicArea.id)}
                 className={(isSelected(props.topicArea.id)) ? "link-no-underline-selected" : "link-no-underline"}>
                {truncate(props.topicArea.name, 20)} <span
                style={{fontSize: "0.75rem"}}>{isSelected(props.topicArea.id) ? "✖" : ""}</span>
            </div>
        </li>

    );
};

export default TopicAreaElement;
