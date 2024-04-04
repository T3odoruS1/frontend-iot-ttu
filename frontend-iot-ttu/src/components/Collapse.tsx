import {FC, ReactElement, ReactNode, useState} from "react";
import {useCollapse} from "react-collapsed";
import SubHeadingPurple from "./common/SubheadingPurple";
import {Col, Row} from "react-bootstrap";
import dropdownIcon from "../assets/iconpack/Dropdown Arrow Icon.svg";

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


    return <div className={"w-100"}>

        <div className={""}>
            <h1
                className="p-2"
                {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded)
            })}><span>{title}
                 <img
                     alt={"dropdown"}
                     src={dropdownIcon}
                     className={`${isExpanded ? 'expanded-collapse-arrow' : 'collapse-arrow'} icon`}
                 />
            </span>
            </h1>
        </div>

        <div {...getCollapseProps()}>
            <div className={"mb-2"}>{children}</div>
        </div>
    </div>
}

export default Collapse;