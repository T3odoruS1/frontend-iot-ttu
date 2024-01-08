import IBaseProps from "../IBaseProps";

const PageTitle: React.FC<IBaseProps> = ({ children, className }) => {
	return (
		<>
			<h1
			className={className || ""}
				style={{
					color: "#342b60",
					fontWeight: 500,
					fontFamily: "ThickTTU sans-serif",
					fontSize: "2.5rem",
					textTransform: "uppercase",
					lineHeight: "2.5rem",
				}}>
				{children}
			</h1>
		</>
	);
};

export default PageTitle;