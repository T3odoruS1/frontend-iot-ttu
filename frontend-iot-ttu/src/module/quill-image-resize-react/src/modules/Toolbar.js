import IconAlignLeft from "../assets/align-left.svg";
import IconAlignCenter from "../assets/align-center.svg";
import IconAlignRight from "../assets/align-right.svg";
import { BaseModule } from "./BaseModule";

let Parchment = {};
let FloatStyle = {};
let MarginStyle = {};
let DisplayStyle = {};

export class Toolbar extends BaseModule {
	onCreate = (parchment) => {
		// Initilize styles
		Parchment = parchment;
		FloatStyle = new Parchment.Attributor.Style("float", "float");
		MarginStyle = new Parchment.Attributor.Style("margin", "margin");
		DisplayStyle = new Parchment.Attributor.Style("display", "display");

		// Setup Toolbar
		this.toolbar = document.createElement("div");
		Object.assign(this.toolbar.style, this.options.toolbarStyles);
		this.overlay.appendChild(this.toolbar);

		// Setup Buttons
		this._defineAlignments();
		this._addToolbarButtons();
	};

	// The toolbar and its children will be destroyed when the overlay is removed
	onDestroy = () => {};

	// Nothing to update on drag because we are are positioned relative to the overlay
	onUpdate = () => {};

	_defineAlignments = () => {
		this.alignments = [
			{
				icon: IconAlignLeft,
				apply: () => {
					DisplayStyle.add(this.img, "inline");
					FloatStyle.add(this.img, "left");
					MarginStyle.add(this.img, "0 1em 1em 0");
				},
				isApplied: () => FloatStyle.value(this.img) == "left",
			},
			{
				icon: IconAlignCenter,
				apply: () => {
					DisplayStyle.add(this.img, "block");
					FloatStyle.remove(this.img);
					MarginStyle.add(this.img, "auto");
				},
				isApplied: () => MarginStyle.value(this.img) == "auto",
			},
			{
				icon: IconAlignRight,
				apply: () => {
					DisplayStyle.add(this.img, "inline");
					FloatStyle.add(this.img, "right");
					MarginStyle.add(this.img, "0 0 1em 1em");
				},
				isApplied: () => FloatStyle.value(this.img) == "right",
			},
		];
	};


	_addToolbarButtons = () => {
		const buttons = [];
		this.alignments.forEach((alignment, idx) => {
			const button = document.createElement('span');
			buttons.push(button);
			button.addEventListener("click", () => {
				// deselect all buttons
				buttons.forEach((button) => (button.style.filter = ""));
				if (alignment.isApplied()) {
					// If applied, unapply
					FloatStyle.remove(this.img);
					MarginStyle.remove(this.img);
					DisplayStyle.remove(this.img);
				} else {
					// otherwise, select button and apply
					this._selectButton(button);
					alignment.apply();
				}
				// image may change position; redraw drag handles
				this.requestUpdate();
			});
			Object.assign(button.style, this.options.toolbarButtonStyles);
			if (idx > 0) {
				button.style.borderLeftWidth = "0";
			}

			console.log(button.innerHTML);
			// this.loadSVG(button.innerHTML, button);
			if (alignment.isApplied()) {
				// select button if previously applied
				this._selectButton(button);
			}
			this.toolbar.appendChild(button);
		});
	};

    loadSVG(url, targetElement) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(data, 'image/svg+xml');
                const svgElement = svgDoc.documentElement;
                console.log(svgElement);
                // Append the SVG element to the target element
                targetElement.innerHTML = "";
                svgElement.style = "position: relative; z-index: 2;"
                targetElement.appendChild(svgElement);
            })
            .catch(error => {
                console.error('Error loading SVG:', error);
            });
    }

	_selectButton = (button) => {
		button.style.filter = "invert(20%)";
	};
}
