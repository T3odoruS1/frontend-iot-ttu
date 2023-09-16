import { useTranslation } from "react-i18next";
import capitalize from "../utils/capitalize";
import { ITopicAreaGet } from "../dto/topicarea/ITopicAreaGet";
import SubHeadingPurple from "./common/SubheadingPurple";
import { Row } from "react-bootstrap";

interface IProps {
	title: string;
	image: string;
	createdAt: string;
	author: string;
	content: string;
	topicAreas: ITopicAreaGet[];
}

const NewsContent = (props: IProps) => {
	const [t] = useTranslation();

	const joinTopicAreas = (): string => {
		return props.topicAreas.map(area => area.name).join(", ");
	}
	return (
		<div className="w-100">
			<SubHeadingPurple className="mt-5">{props.title}</SubHeadingPurple>
			<Row className="w-100 mb-5">
				{props.image !== undefined && props.image.length > 0 ? (
					<>
						<div className="col-md-9">
							<img
								src={props.image}
								alt="Poster_image"
								className="content_image max-w"
							/>
						</div>
						<div className="col-md-3">
						<p className="header-date">
								<b>{props.createdAt}</b>
							</p>
							<p>
								<b>
									<span className="text-purple-main">{capitalize(t("author"))}: {props.author}</span>
								</b>
							</p>
							<p className="text-purple-main">
								<b>{joinTopicAreas()}</b>
							</p>

						</div>
					</>
				) : (
					<>
						<div className="col-md-12">
							<p>
								<b>
									Author:{" "}
									<span className="text-purple-main">{props.author}</span>
								</b>
							</p>
							<p className="text-purple-main">
								<b>Technology, Electricity</b>
							</p>
							<p className="header-date">
								<b>{props.createdAt}</b>
							</p>
						</div>
					</>
				)}
			</Row>
			<div className="w-100 mt-2">
				<div className="quill">
					<div className="result-div ql-container ql-snow" style={{position:"relative"}}>
						<div
							className="ql-editor"
							dangerouslySetInnerHTML={{ __html: props.content }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsContent;
