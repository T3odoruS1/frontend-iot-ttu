import { Link } from "react-router-dom";
import { ITopicAreaWithChildren } from "../../../../dto/topicarea/ITopicAreaWithChildren";

const TopicAreaElement = (topicArea: ITopicAreaWithChildren) => {
	return (
		<div>

				<li className="">
					<Link to="." className="link-no-underline">
						{topicArea.name}
					</Link>
				</li>
				{topicArea.childrenTopicAreas?.map((child) => {
					return (
							<li className="" key={child.id}>
								<Link to="." className="px-4 link-no-underline">
									{child.name}
								</Link>
							</li>
					);
				})}

		</div>
	);
};

export default TopicAreaElement;
