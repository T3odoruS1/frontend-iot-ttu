import {FC, ReactElement} from "react";

interface IProps {
    headerContent: ReactElement;
    bodyContent: ReactElement;
}

const LayoutMulticolour: FC<IProps> = ({headerContent, bodyContent}) => {
    return (<div className={"base-layout"}>
        <div className={"layout-boundary base-layout-header"}>
            {headerContent}
        </div>
        <div className={"base-layout-body gray-bg"}>
            <div className={"layout-boundary"}>
                {bodyContent}
            </div>
        </div>
    </div>);
}

export default LayoutMulticolour;