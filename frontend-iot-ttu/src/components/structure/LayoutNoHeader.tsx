import {FC, ReactElement} from "react";

interface IProps {
    bodyContent: ReactElement;
}

const LayoutNoHeader: FC<IProps> = ({ bodyContent}) => {
    return (<div className={"base-layout mt-2"}>
        <div className={"base-layout-body"}>
            <div className={"layout-boundary"}>
                {bodyContent}
            </div>
        </div>
    </div>);
}

export default LayoutNoHeader;