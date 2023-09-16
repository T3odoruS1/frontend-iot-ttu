import { INews } from "../../../../dto/news/INews";
import placeholder from "../../../../assets/placeholder.webp"
import { useNavigate } from "react-router-dom";
import i18n from 'i18next';
import { Col } from "react-bootstrap";

interface IProps{
    news: INews;
}

const NewsElement: React.FC<IProps> = ({news}) => {
	const navigate = useNavigate();
	const getDate = (strDate: string) => {
	  return (new Date(strDate)).toLocaleDateString();
	}

	const getTopicAreasAsStr = () => {
		const names: string[] = []
		news.topicAreas.map((area) => {
		  names.push(area.name);
		})
	  return names.join(", ")
	}
	const navigateToDetails = () => {
	  navigate(`./${news.id}`);
	}

	return (
		
		<Col md="6" className="mb-5" onClick={navigateToDetails}>
			<div className="news-card">
			<div className="w-100">
				<img className="thumbnail" src={news.image ?? placeholder} alt="" />
			<span className="header-date">
				{getDate(news.createdAt)}
			</span>
			<br />
			<span className="topic-area-list">
				{getTopicAreasAsStr()}
			</span>
			</div>
				<h3 className="header-purple">{news.title}</h3>
			</div>
		</Col>
	);
};

export default NewsElement;
