import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import "react-quill/dist/quill.core.css";

const modules = {
	toolbar: [
		["bold", "italic", "underline", "strike"],
		["blockquote", "code-block"],

		[{ list: "ordered" }, { list: "bullet" }],
		[{ script: "sub" }, { script: "super" }],
		[{ indent: "-1" }, { indent: "+1" }],
		[{ direction: "rtl" }],

		[{ size: ["small", false, "large", "huge"] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }],
		[{ font: [] }],
		[{ align: [] }],

		["clean"],

		["link", "image", "video"],
	],
};

const formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video",
	"color",
	"background",
	"align",
	"direction",
	"code-block",
	"script",
];

const NewsDemoPage = () => {
	const [editorHtml, setEditorHtml] = useState<string>("");

	const handleChange = (html: string) => {
		setEditorHtml(html);
	};

	const onSubmit = () => {
		console.log(editorHtml);
	};
	return (
		<>
			<div>
				<h2>Demo for editor and result</h2>

				<div
					className="mt-5"
					style={{
						marginRight: "auto",
						marginLeft: "auto",
					}}>
					<ReactQuill
						theme="snow"
						value={editorHtml}
						onChange={handleChange}
						modules={modules}
						formats={formats}
					/>
				</div>
				<button
					type="button"
					className="btn btn-primary m-5"
					onClick={onSubmit}>
					Submit
				</button>
			</div>
			<hr />

			<h2>Exported result in plain HTML</h2>
            <hr />
            <h4>Title here</h4>
			<div className="result-div ql-container ql-snow">
				<div
					className="ql-editor"
					dangerouslySetInnerHTML={{ __html: editorHtml }}
				/>
			</div>
		</>
	);
};

export default NewsDemoPage;
