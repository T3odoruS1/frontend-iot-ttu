import { Link } from "react-router-dom";
import { ITopicAreaWithChildren } from "../../../../dto/topicarea/ITopicAreaWithChildren";

const TopicAreaElement = (topicArea: ITopicAreaWithChildren) => {

	const truncate = (str: string, len: number) => {
		return str.length > len ? str.substring(0, len-3) + "..." : str;
	}

	return (
		<div>

				<li className="">
					<Link to="." className="link-no-underline">
						{truncate(topicArea.name, 20)}
					</Link>
				</li>
				{topicArea.childrenTopicAreas?.map((child) => {
					return (
							<li className="" key={child.id}>
								<Link to="." className="link-no-underline">
									<span className={"child_list_element"}>{truncate(child.name, 18)}</span>
								</Link>
							</li>
					);
				})}

		</div>
	);
};

export default TopicAreaElement;
