import ImageResize from '../module/quill-image-resize-react/src/ImageResize.js';
import {Quill} from 'react-quill';
import 'quill/dist/quill.snow.css';


Quill.register('modules/imageResize', ImageResize);


export const modules = {
    imageResize: {
        parchment: Quill.import('parchment'),
		modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    },
	toolbar: [
		["bold", "italic", "underline", "strike"],
		["blockquote", "code-block"],

		[{ list: "ordered" }, { list: "bullet" }],
		[{ script: "sub" }, { script: "super" }],
		[{ indent: "-1" }, { indent: "+1" }],
		[{ direction: "rtl" }],

		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }],
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



export const SUPPORTED_FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];