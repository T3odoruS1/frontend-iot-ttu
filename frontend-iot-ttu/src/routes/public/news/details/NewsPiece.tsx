import path from "path";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { INews } from "../../../../dto/news/INews";
import { NewsService } from "../../../../services/NewsService";
import i18n from "i18next";
import NewsContent from "../../../../components/NewsContent";

const NewsPiece = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [news, setNews] = useState<INews | undefined>();
	const newsService = new NewsService();
  const [image, setImage] = useState();

	const fetchNewsPiece = async () => {
  		const newsResult = await newsService.get<INews>(
			`${i18n.language}/news/getById?id=${params.id}`
		);
		if (newsResult !== undefined) {
			setNews(newsResult);
		}
	};

	useEffect(() => {
    console.log(params.id);
    
		if (!params.id) {
			navigate("./");
		}
    fetchNewsPiece();
	}, [i18n.language]);
	return (
		<>
			<NewsContent
				title={news?.title ?? ""}
				image={news?.image ?? ""}
				createdAt={new Date(news?.createdAt ?? "").toLocaleDateString()}
				author={news?.author ?? ""}
				content={news?.body ?? ""}
        topicAreas={news?.topicAreas ?? []}
			/>
		</>
	);
};

export default NewsPiece;
