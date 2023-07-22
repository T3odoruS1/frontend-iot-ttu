interface IProps {
	title: string;
	image: string;
	createdAt: string;
	author: string;
	content: string;
	lang: string;
}

const NewsContent = (props: IProps) => {
	return (
		<div className="m-2 w-75">
			<h1 className="page-title">{props.title}</h1>
			<div>{props.author}</div>
			<div className="header-date">{props.createdAt}</div>
			<div className="p-2 content-bg">
				<img src={props.image} alt="Poster_image" className="content_image" />
				<div className="result-div ql-container ql-snow">
					<div
						className="ql-editor"
						dangerouslySetInnerHTML={{ __html: props.content }}
					/>
				</div>
			</div>
		</div>
	);
};

export default NewsContent;
