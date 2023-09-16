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

const NewsList = () => {
	const [topicAreas, setTopicAreas] = useState<ITopicAreaWithChildren[]>([]);
	const [news, setNews] = useState<INews[]>([]);
	const { t } = useTranslation();
	const topicAreaService = new TopicAreaService();
	const newsService = new NewsService();

	const fetchNews = async () => {
		const newsResponse = await newsService.get<INews[]>(
			`${i18n.language}/news/get`
		);
		if (newsResponse !== undefined) {
			setNews(newsResponse);
		}
	};

	const fetchTopicAreas = async () => {
		const topicAreaResponse = await topicAreaService.get<
			ITopicAreaWithChildren[]
		>(`${i18n.language}/topicAreas/get`);
		if (topicAreaResponse !== undefined) {
			setTopicAreas(topicAreaResponse);
		}
	};

	useEffect(() => {
		fetchTopicAreas();
		fetchNews();
	}, [i18n.language]);

	return (
		<Row>
			<Col md="10">
				<Row >
					{news.map((article) => {
						return <NewsElement news={article} />;
					})}
				</Row>
			</Col>
			<Col md="2" className="filter-box px-4">
				<h3 className="header-pink">Filters</h3>
				<ul className="p-0">
					{topicAreas.map((topicArea) => {
						return (
							<TopicAreaElement
								name={topicArea.name}
								childrenTopicAreas={topicArea.childrenTopicAreas}
								id={topicArea.id}
							/>
						);
					})}
				</ul>
			</Col>
		</Row>
	);
};

export default NewsList;
