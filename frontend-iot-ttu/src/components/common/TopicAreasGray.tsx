import {FC, ReactNode} from "react";

const TopicAreasGray: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <span className="topic-area-list">{children}</span>
    );
};

 export default TopicAreasGray;