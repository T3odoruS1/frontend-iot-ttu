import { useTranslation } from "react-i18next";
import capitalize from "../utils/capitalize";

interface IProps {
	title: string;
	image: string;
	createdAt: string;
	author: string;
	content: string;
	lang: string;
}

const NewsContent = (props: IProps) => {
	const [t] = useTranslation();
	return (
		<div className="m-2 w-100">
			<h2 className=" p-3 header-purple">{props.title}</h2>
			<br />
			<div className="row w-100 mb-5 p-3">
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
								<b><a href=".">Technology</a>, <a href=".">Electricity</a></b>
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
			</div>
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
