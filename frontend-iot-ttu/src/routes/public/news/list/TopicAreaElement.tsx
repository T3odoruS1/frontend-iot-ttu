import {Link, useLocation} from "react-router-dom";
import { ITopicAreaWithChildren } from "../../../../dto/topicarea/ITopicAreaWithChildren";

interface IProps{
	topicArea: ITopicAreaWithChildren,
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
				{props.topicArea.childrenTopicAreas?.map((child) => {
					return (
							<li className="" key={child.id}>
								<div onClick={() => props.onTopicAreaChange(child.id)} className={
									(searchParams.has("topicArea") && searchParams.get("topicArea") === child.id) ? "link-no-underline-selected" : "link-no-underline"
								}>
									<span className={"child_list_element"}>{truncate(child.name, 18)}</span>
								</div>
							</li>
					);
				})}

		</div>
	);
};

export default TopicAreaElement;
