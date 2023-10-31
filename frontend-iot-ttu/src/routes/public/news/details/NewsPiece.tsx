import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import i18n from "i18next";
import NewsContent from "../../../../components/NewsContent";
import NavigationButton from "../../../../components/common/NavigationButton";
import useNews from "../../../../hooks/useNews";

const NewsPiece = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const {newsPiece: news, pending} = useNews(id ?? "");
	useEffect(() => {
		console.log(i18n.language, "NewsPiece")
	})
	return (
		<div>

			<div className={"mb-4"}>
				<NavigationButton to={"../"}>News list</NavigationButton>
			</div>

			{/*<PageTitle>Uudised</PageTitle>*/}
			{pending ? <p>Loading...</p> : (<NewsContent
				title={news?.title ?? ""}
				image={news?.image ?? ""}
				createdAt={new Date(news?.createdAt ?? "").toLocaleDateString()}
				author={news?.author ?? ""}
				content={news?.body ?? ""}
				topicAreas={news?.topicAreas ?? []}
			/>)}

		</div>
	);
};

export default NewsPiece;
