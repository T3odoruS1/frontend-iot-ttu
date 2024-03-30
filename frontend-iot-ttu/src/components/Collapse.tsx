import {FC, ReactNode, useState} from "react";
import {useCollapse} from "react-collapsed";
import SubHeadingPurple from "./common/SubheadingPurple";

interface IProps {
    isActive: boolean;
    title: string;
    children: ReactNode;
}

const Collapse: FC<IProps> = ({isActive, title, children}) => {
    const [isExpanded, setExpanded] = useState(isActive);
    const duration = 750;
    const {getToggleProps, getCollapseProps} = useCollapse({
        isExpanded,
        duration
    });


    return <div className={"collapse-card w-100"}>
        <SubHeadingPurple className="toggle-category all-caps" {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded)
        })}><span className={isExpanded ? "expanded-collapse-arrow" : "collape-arrow"}>› </span>{title}
        </SubHeadingPurple>
        <div {...getCollapseProps()}><div className={"mb-2"}>{children}</div></div>
    </div>
}

export default Collapse;