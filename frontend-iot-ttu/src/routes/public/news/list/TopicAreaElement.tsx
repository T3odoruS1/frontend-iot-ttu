import { Link } from "react-router-dom";
import { ITopicAreaWithChildren } from "../../../../dto/topicarea/ITopicAreaWithChildren";

const TopicAreaElement = (topicArea: ITopicAreaWithChildren) => {
	return (
		<div>

				<li className="my-2">
					<Link to="." className="link-no-underline mb-2">
						{topicArea.name}
					</Link>
				</li>
				{topicArea.childrenTopicAreas?.map((child) => {
					return (
							<li className="my-2" key={child.id}>
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
