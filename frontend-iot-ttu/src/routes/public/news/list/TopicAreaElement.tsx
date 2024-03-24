import {Link, useLocation} from "react-router-dom";
import {ITopicAreaGet} from "../../../../dto/topicarea/ITopicAreaGet";

interface IProps{
	topicArea: ITopicAreaGet,
	onTopicAreaChange: (newTopicArea: string | null) => void
}

const TopicAreaElement = (props: IProps) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search)
	const truncate = (str: string, len: number) => {
		return str.length > len ? str.substring(0, len-3) + "..." : str;
	}

	return (
		<div>

				<li className="">
					<div onClick={() => props.onTopicAreaChange(props.topicArea.id)} className={
						(searchParams.has("topicArea") && searchParams.get("topicArea") === props.topicArea.id) ? "link-no-underline-selected" : "link-no-underline"
					}>
						{truncate(props.topicArea.name, 20)}
					</div>
				</li>

		</div>
	);
};

export default TopicAreaElement;
