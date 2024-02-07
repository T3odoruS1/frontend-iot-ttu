import ImageResize from '../module/quill-image-resize-react/src/ImageResize.js';
import {Quill} from 'react-quill';
import 'quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);
Quill.register(Quill.import("blots/inline"), true);

export const modules = {
    imageResize: {
        parchment: Quill.import('parchment'),
		modules: [
			'Resize',
			'DisplaySize'
			// "Toolbar"
		]
    },

	toolbar: [
		["bold", "italic", "underline", "strike"],
		["blockquote", "code-block"],

		[{ list: "ordered" }, { list: "bullet" }],
		[{ script: "sub" }, { script: "super" }],
		[{ indent: "-1" }, { indent: "+1" }],
		[{ direction: "rtl" }],

		[{ header: [1, 2, 3, false] }],

		[{ color: [] }, { background: [] }],
		[{ align: [] }],

		["clean"],

		["link", "image", "video"],
       
	]
};

export const reducedModules = {
	toolbar: [
		["link"],
		["bold", "italic", "underline", "strike"],
	]
}

export const formats = [
	"style",
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
	"width",
	"height",
	"display",
	"margin",
	"float",
	"cursor"
];


export const reducedFormats = [
	"style",
	"header",
	"font",
	"size",
	"link",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote"
]



export const SUPPORTED_FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/base64'];