import {IAccessDetail} from "../../../dto/opensourcesolutions/IAccessDetail";
import {FC, useState} from "react";
import {useCollapse} from "react-collapsed";
import dropdownIcon from "../../../assets/iconpack/Dropdown Arrow Icon.svg"

export const AccessDetail: FC<{ accessDetails: IAccessDetail[] }> = ({accessDetails}) => {
    const [isExpanded, setExpanded] = useState(false);
    const duration = 750;
    const {getToggleProps, getCollapseProps} = useCollapse({
        isExpanded,
        duration
    });
    return (
        <div>
            <div className={"link-arrow"} {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded)
            })}>
                Show requests
                <img
                    className={`${isExpanded ? 'expanded-collapse-arrow' : 'collapse-arrow'} icon`}
                    alt={"Dropdown"}
                    src={dropdownIcon}
                />
            </div>

            <div {...getCollapseProps()}>
                <hr/>
                {accessDetails.map((detail) => {
                    return (
                        <div>
                            {new Date(detail.date).toLocaleDateString()} | {detail.email}
                        </div>)
                })}
            </div>
        </div>
    );
};