import Quill from "quill";
import ImageResize from 'quill-image-resize-module-react'

let Size = Quill.import('attributors/style/size');
// let Font = Quill.import('formats/font');
// Font.whitelist = ['ProximaNova', 'black']

//   font-family: ProximaNovaBlack,sans-serif;


Size.whitelist = ['8pt', '12pt', '14pt', '16pt', '18pt', '20pt', '32pt'];
Quill.register(Size, true);


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

		// [{ 'size': ['8pt', '10pt', '12pt' , '14pt', false, '18pt', '20pt', '32pt'] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }],
		// [{ font: [] }],
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