import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import "react-quill/dist/quill.core.css";
import  ImageResize  from 'quill-image-resize-module-react';
import Quill from 'quill';
// import dotenv from "dotenv";
import { formats, modules } from "../../Configurations/configurations";


// dotenv.config();

Quill.register('modules/imageResize', ImageResize);

const NewsDemoPage = () => {
	const [editorHtml, setEditorHtml] = useState<string>("");

	const handleChange = (html: string) => {
		setEditorHtml(html);
	};

    const displayMode = () => {
    //   console.log(process.env.MODE);
      
    }

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
            <button onClick={displayMode}>Mode</button>
			<h2>Exported result in plain HTML</h2>
            <hr />
            <hr /><hr /><hr /><hr />    
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
