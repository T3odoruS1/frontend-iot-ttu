import {FC, ReactElement} from "react";

interface IProps {
    headerContent: ReactElement;
    bodyContent: ReactElement;
}


const LayoutDefault: FC<IProps> = ({headerContent, bodyContent}) => {
    return (<div className={"base-layout"}>
        <div className={"layout-boundary base-layout-header"}>
            {headerContent}
        </div>
        <div className={"base-layout-body"}>
            <div className={"layout-boundary"}>
                {bodyContent}
            </div>
        </div>
    </div>);
}

export default LayoutDefault;