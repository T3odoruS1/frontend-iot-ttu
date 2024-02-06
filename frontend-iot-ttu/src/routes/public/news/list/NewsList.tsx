import {Col, Row} from "react-bootstrap";
import TopicAreaFilters from "../../../../components/common/FilterBox";
import PageTitle from "../../../../components/common/PageTitle";
import {useTranslation} from "react-i18next";
import {Loader} from "../../../../components/Loader";
import usePaginatedFetch from "../../../../hooks/usePaginatedFetch";
import {NewsService} from "../../../../services/NewsService";
import {INews} from "../../../../dto/news/INews";
import {useState} from "react";
import Pagination from "react-js-pagination";
import ErrorPage from "../../../ErrorPage";
import {useNavigate} from "react-router-dom";
import placeholder from "../../../../assets/placeholder.webp";
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
                <img className="thumbnail" src={news.image !== undefined && news.image !== "" ? news.image : placeholder} alt=""/>
                <DatePink date={getDate(news.createdAt)}/>
                <br/>
                <TopicAreasGray>{getTopicAreasAsStr()}</TopicAreasGray>
                <h3 className="header-purple">{news.title}</h3>
            </div>
        </Col>


    );
};



const NewsList = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(6);
    const {data: news, pending, total, error} =
        usePaginatedFetch<INews, NewsService>(new NewsService(), page - 1, size);

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber)
    }

    if(error == "500"){
        return <ErrorPage/>
    }else{
        return <>
            <PageTitle>{t("public.news.news")}</PageTitle>
            {pending ? <Loader/> :
                (<Row className="flex-column flex-md-row">
                        <Col className="col-md-9 order-md-0 order-1 news-grid">
                            <Row>
                                {news.map((article) => {
                                    return <NewsElement key={article.id} news={article}/>;
                                })}
                            </Row>


                        </Col>
                        <Col className=" col-md-3 order-md-1 order-0">
                            <TopicAreaFilters/>
                        </Col>

                    </Row>
                )}

            <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={handlePageClick.bind(this)}
                innerClass={"pagination-navigation"}
                linkClass={"pagination-element"}
                activeLinkClass={"active-page-li"}
            />
        </>;
    }
};



export default NewsList;
