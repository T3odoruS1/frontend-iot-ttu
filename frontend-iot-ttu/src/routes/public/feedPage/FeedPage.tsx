import { FC } from "react";

interface IProps{
    pageIdentifier: string;
}

const FeedPage: FC<IProps> = ({pageIdentifier}) => {
    return <>{pageIdentifier}</>
}

export default FeedPage;