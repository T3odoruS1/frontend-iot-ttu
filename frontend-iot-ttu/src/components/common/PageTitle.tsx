import IBaseProps from "../IBaseProps";

const PageTitle: React.FC<IBaseProps> = ({ children, className }) => {
	return (
		<>
			<h1 className={"page-title all-caps"}>
				{children}
			</h1>
		</>
	);
};

export default PageTitle;