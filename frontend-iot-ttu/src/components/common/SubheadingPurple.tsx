interface IProps{
    children: React.ReactNode;
    className?: string;
}
const SubHeadingPurple: React.FC<IProps> = ({children, className, ...rest}) => {
  return <h2 {...rest} className={`header-purple ${className || ""}`}>{children}</h2>;
}

export default SubHeadingPurple;