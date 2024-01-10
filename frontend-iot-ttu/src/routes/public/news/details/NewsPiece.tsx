import { useNavigate, useParams } from "react-router-dom";
import NewsContent from "../../../../components/NewsContent";
import NavigationButton from "../../../../components/common/NavigationButton";
import useNews from "../../../../hooks/useNews";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {useTranslation} from "react-i18next";
import {Loader} from "../../../../components/Loader";
import ErrorPage from "../../../ErrorPage";

const NewsPiece = () => {
	const {t} = useTranslation();
	const {id} = useParams();
	const navigate = useNavigate();
	const {newsPiece: news, pending, error} = useNews(id ?? "");

	const onContactUsClick = () => {
		navigate("../../contact")
	}

	if (error) return <ErrorPage></ErrorPage>;
	if(! error) return (
		<div>
			<div className={"mb-4"}>
				<NavigationButton to={"../"}>{t("public.news.news-list")}</NavigationButton>
			</div>

			{pending ? <Loader/> : (<NewsContent
				title={news?.title ?? ""}
				image={news?.image ?? ""}
				createdAt={new Date(news?.createdAt ?? "").toLocaleDateString()}
				author={news?.author ?? ""}
				content={news?.body ?? ""}
				topicAreas={news?.topicAreas ?? []}
			/>)}

			<div className={"mt-5"}>
				<ButtonPrimary onClick={onContactUsClick}>{t("public.news.contact")}</ButtonPrimary>
			</div>

		</div>
	);
	return <></>
};

export default NewsPiece;
