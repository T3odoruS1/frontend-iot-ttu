import { FC } from "react";
import IBaseProps from "../IBaseProps";

const ButtonSmaller = ({...rest}) => {
	return (
		<button
			style={{
				fontSize: "0.8rem",
				fontWeight: 900,
				textTransform: "uppercase",
				color: "#fff",
				border: "4px solid #e4067e",
				lineHeight: "1.25rem",
				backgroundColor: "#e4067e",
				transition: "all .3s ease",
				display: "inline-block",
				textDecoration: "none",
				padding: "calc(0.1rem - 4px) calc(1.3125rem - 4px) calc(0.4rem - 4px)",
				borderRadius: "60px",
			}}
			{...rest}>
			
		</button>
	);
};

export default ButtonSmaller;
