import { FC } from "react";
import IBaseProps from "../IBaseProps";

const ButtonSmaller = ({...rest}) => {
	return (
		<button
			style={{
				fontSize: "0.8rem",
				fontWeight: 900,
				// maxHeight: "2rem",
				textTransform: "uppercase",
				color: "#fff",
				border: "4px solid #e4067e",
				lineHeight: "1.25rem",
				backgroundColor: "#e4067e",
				display: "inline-block",
				textDecoration: "none",
				// textAlign: "center",
				padding: "0.0rem",
				// minWidth:"6rem",
				borderRadius: "60px",
			}}
			{...rest}>
			
		</button>
	);
};

export default ButtonSmaller;
