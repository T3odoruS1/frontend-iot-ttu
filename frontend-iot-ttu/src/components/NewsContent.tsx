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
		<div className="m-2">
			<h2 className="header-purple">{props.title}</h2>
			<br />
			<div className="row">
				<div className="col-md-9">
					<img src={props.image} alt="Poster_image" className="content_image" />
				</div>
				<div className="col-md-3">
					
					<p><b>Author: <span className="text-purple-main">{props.author}</span></b></p>
					<p className="text-purple-main"><b>Technology, Electricity</b></p>
					<p className="header-date"><b>{props.createdAt}</b></p>
					
				</div>
			</div>
			<hr />
			<br />
			<div className="p-2 content-bg">
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
