import {FC, ReactNode, useState} from "react";
import {IFeedPageCategory} from "../dto/feedpage/category/IFeedPageCategory";
import {useCollapse} from "react-collapsed";
import SubHeadingPurple from "./common/SubheadingPurple";

interface IProps {
    isActive: boolean;
    title: string;
    children: ReactNode;
}

const Collapse: FC<IProps> = ({isActive, title, children}) => {



    const [isExpanded, setExpanded] = useState(isActive);
    const {getToggleProps, getCollapseProps} = useCollapse({
        isExpanded,
    });


    return <div className={"collapse-card"}>
        <SubHeadingPurple className="toggle-category all-caps" {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded)
        })}><span className={isExpanded ? "expanded-collapse-arrow" : "collape-arrow"}>› </span>{title}
        </SubHeadingPurple>
        <div {...getCollapseProps()}><div className={"m-2"}>{children}</div></div>
    </div>
}

export default Collapse;