import { IFeedPagePostOutput } from "../../../../dto/feedpage/post/IFeedPagePostOutput";
import { FC } from "react";
import FeedPagePostElement from "./FeedPagePostElement";
import { useTranslation } from "react-i18next";
// import i18n from "i18next";

interface IProps {
    fieldValues: IFeedPagePostOutput
}

const FeedPagePostPreview: FC<IProps> = ({ fieldValues }) => {

    const { i18n } = useTranslation();


    const getContent = (value: string | undefined, def: string) => {
        if (value !== undefined && value.length > 0) {
            return value;
        }
        return def;
    }

    return <FeedPagePostElement post={{
        feedPageCategoryId:"",
        title: i18n.language === "en" ? getContent(fieldValues?.title?.at(0)?.value, "") : getContent(fieldValues?.title?.at(1)?.value, ""),
        body: i18n.language === "en" ? getContent(fieldValues?.body?.at(0)?.value, "") : getContent(fieldValues?.body?.at(1)?.value, ""),
        createdAt: new Date().toLocaleDateString(),
        id: ""
    }}

    />

}

export default FeedPagePostPreview;