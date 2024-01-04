import {INews} from "../../../../dto/news/INews";
import placeholder from "../../../../assets/placeholder.webp"
import {useNavigate} from "react-router-dom";
import {Col} from "react-bootstrap";
import DatePink from "../../../../components/common/DatePink";
import TopicAreasGray from "../../../../components/common/TopicAreasGray";

interface IProps {
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


        <Col md="6" className="clickable-pointer mb-5" onClick={navigateToDetails}>
            <div className="w-100">
                <img className="thumbnail" src={news.image ?? placeholder} alt=""/>
                <DatePink date={getDate(news.createdAt)}/>
                <br/>
                <TopicAreasGray>{getTopicAreasAsStr()}</TopicAreasGray>
                <h3 className="header-purple">{news.title}</h3>
            </div>
        </Col>


    );
};

export default NewsElement;
