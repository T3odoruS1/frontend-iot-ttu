import { Link } from "react-router-dom";

interface IProps {
    title: string;
    to: string;
}

const HeaderNavLink = (props: IProps) => {
	return <><li className="nav-item">
    <Link className="nav-link top-text" aria-current="page" to={props.to}>
        {props.title}
    </Link>
</li></>;
};

export default HeaderNavLink;
