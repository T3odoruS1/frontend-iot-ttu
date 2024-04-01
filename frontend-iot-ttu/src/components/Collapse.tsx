import {FC, ReactElement, ReactNode, useState} from "react";
import {useCollapse} from "react-collapsed";
import SubHeadingPurple from "./common/SubheadingPurple";
import {Col, Row} from "react-bootstrap";

interface IProps {
    isActive: boolean;
    title: string;
    children: ReactNode;
    headerControls?: ReactElement
}

const Collapse: FC<IProps> = ({isActive, title, children, headerControls}) => {
    const [isExpanded, setExpanded] = useState(isActive);
    const duration = 750;
    const {getToggleProps, getCollapseProps} = useCollapse({
        isExpanded,
        duration
    });


    return <div className={"collapse-card w-100"}>

        <div className={"toggle-category"}>
            <SubHeadingPurple className=" all-caps" {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded)
            })}><span className={isExpanded ? "expanded-collapse-arrow" : "collape-arrow"}>› </span>{title}
            </SubHeadingPurple>
        </div>

        <div {...getCollapseProps()}>
            <div className={"mb-2"}>{children}</div>
        </div>
    </div>
}

export default Collapse;