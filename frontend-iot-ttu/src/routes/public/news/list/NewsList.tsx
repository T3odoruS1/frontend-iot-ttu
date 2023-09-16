import { useEffect, useState } from "react";
import { ITopicAreaWithChildren } from "../../../../dto/topicarea/ITopicAreaWithChildren";
import { useTranslation } from "react-i18next";
import { TopicAreaService } from "../../../../services/TopicAreaService";
import i18n from "i18next";
import TopicAreaElement from "./TopicAreaElement";
import NewsElement from "./NewsElement";
import { NewsService } from "../../../../services/NewsService";
import { INews } from "../../../../dto/news/INews";
import { Col, Row } from "react-bootstrap";
import FilterBox from "../../../../components/common/FilterBox";

const NewsList = () => {
	const [topicAreas, setTopicAreas] = useState<ITopicAreaWithChildren[]>([]);
	const [news, setNews] = useState<INews[]>([]);
	const { t } = useTranslation();
	const topicAreaService = new TopicAreaService();
	const newsService = new NewsService();
	const fetchNews = async () => {
		const newsResponse = await newsService.getAll(i18n.language)
		if (newsResponse !== undefined) {
			setNews(newsResponse);
		}
	};



	const fetchTopicAreas = async () => {
		const topicAreaResponse = await topicAreaService.getWithChildren(i18n.language);
		if (topicAreaResponse !== undefined) {
			setTopicAreas(topicAreaResponse);
		}
	};


	useEffect(() => {
		fetchTopicAreas();
		fetchNews();
	}, [i18n.language]);

	return (
		<Row className="flex-column flex-md-row">
			<Col className="col-md-10 order-md-0 order-1">
				<Row>
					{news.map((article) => {
						return <NewsElement news={article} />;
					})}
				</Row>
			</Col>
			<FilterBox topicAreas={topicAreas}/>
		</Row>
	);
};

export default NewsList;
