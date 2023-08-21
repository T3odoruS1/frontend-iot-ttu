import Quill from "quill";
import ImageResize from 'quill-image-resize-module-react'




export const modules = {
    imageResize: {
        parchment: Quill.import('parchment')
    },
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

export const formats = [
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

Quill.register('modules/imageResize', ImageResize);

export const SUPPORTED_FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];