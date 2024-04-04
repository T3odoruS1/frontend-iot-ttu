
const ButtonPrimary = ({...rest}) => {
	return (
		<button
			style={{
				fontSize: "1.125rem",
				fontWeight: 500,
				fontFamily: "ThickTTU sans-serif",
				textTransform: "uppercase",
				color: "#fff",
				border: "4px solid #e4067e",
				lineHeight: "1.25rem",
				backgroundColor: "#e4067e",
				transition: "all .3s ease",
				display: "inline-block",
				textDecoration: "none",
				padding: "calc(1.1rem - 4px) calc(2.3125rem - 4px) calc(1.4rem - 4px)",
				borderRadius: "60px",
			}}

			{...rest}>
		</button>
	);
};

export default ButtonPrimary;
