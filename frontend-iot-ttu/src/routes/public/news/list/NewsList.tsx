import {Col, Row} from "react-bootstrap";
import TopicAreaFilters from "./FilterBox";
import PageTitle from "../../../../components/common/PageTitle";
import {useTranslation} from "react-i18next";
import {Loader} from "../../../../components/Loader";
import usePaginatedFetch from "../../../../hooks/usePaginatedFetch";
import {NewsService} from "../../../../services/NewsService";
import {INews} from "../../../../dto/news/INews";
import {useEffect, useState} from "react";
import Pagination from "react-js-pagination";
import ErrorPage from "../../../ErrorPage";
import {useLocation, useNavigate} from "react-router-dom";
import placeholder from "../../../../assets/placeholder.webp";
import DatePink from "../../../../components/common/DatePink";
import i18n from "i18next";
import LayoutMulticolour from "../../../../components/structure/LayoutMulticolour";
import Show from "../../../../components/common/Show";

interface IProps {
    news: INews;
}

const NewsElement: React.FC<IProps> = ({news}) => {

    const navigate = useNavigate();
    const getDate = (strDate: string) => {
        return (new Date(strDate)).toLocaleDateString();
    }

    const navigateToDetails = () => {
        navigate(`./${news.id}`);
    }

    return (


        <Col md="6" className="clickable-pointer mb-5" onClick={navigateToDetails}>
            <div className="w-100">
                <div className="zoom-img-container">
                    <img className="thumbnail zoom-image"
                         src={news.image !== undefined && news.image !== "" ? news.image : placeholder}
                         alt=""/>
                </div>
                <div className={"d-flex flex-column"}>
                    <DatePink date={getDate(news.createdAt)}/>
                </div>
                <h1>{news.title}</h1>
            </div>
        </Col>


    );
};


const NewsList = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [page, setPage] =
        useState<number>(parseInt(new URLSearchParams(location.search).get('page') || '1', 10));
    const [size, setSize] =
        useState<number>(6); // Assuming 'size' won't change for now
    const [topicArea, setTopicArea] =
        useState<string | null>(new URLSearchParams(location.search).get('topicArea'));
    const {data: news, pending, total, error, fetch} =
        usePaginatedFetch<INews, NewsService>(new NewsService(), page - 1, size, topicArea ? [topicArea] : []);


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hasPage = searchParams.has('page');
        const hasSize = searchParams.has('size');
        let locationHasChanged = false;

        if (!hasPage) {
            searchParams.set('page', '1');
            setPage(1);
            locationHasChanged = true;
        }
        if (!hasSize) {
            locationHasChanged = true;
            setPage(1);
            searchParams.set('size', '6');
        }
        if (locationHasChanged) {
            navigate(`/${i18n.language}/news?${searchParams.toString()}`, {replace: true});
        }
    }, [i18n.language, navigate, location.search, topicArea]);


    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', pageNumber.toString());
        navigate(`/${i18n.language}/news?${searchParams.toString()}`);
    };

    const handleTopicAreaChange = (newTopicArea: string | null) => {
        const searchParams = new URLSearchParams(location.search);
        if (topicArea === newTopicArea) {
            setTopicArea(null);
            setPage(1);
            searchParams.delete("topicArea");
        } else if (newTopicArea) {
            searchParams.set('topicArea', newTopicArea);
            searchParams.set('page', "1");
            setPage(1);
            setTopicArea(newTopicArea);
        } else {
            searchParams.delete('topicArea');
            setPage(1);
            setTopicArea(null);
        }
        navigate(`/${i18n.language}/news?${searchParams.toString()}`);
    };

    if (error === "500") {
        return <ErrorPage/>;
    } else {
        return (<LayoutMulticolour
            headerContent={
                <PageTitle>{t("public.news.news")}</PageTitle>
            }
            bodyContent={
                <>
                    {pending ? <Loader /> : (
                        <Row className="flex-column flex-md-row mt-md-5 mt-2">
                            <Col className="col-md-9 order-md-0 order-1 news-grid">
                                <Row >
                                    {news?.map((article) => (
                                        <NewsElement key={article.id} news={article} />
                                    ))}
                                </Row>
                            </Col>
                            <Col  className="col-md-3 order-md-1 order-0">
                                <TopicAreaFilters onTopicAreaChange={handleTopicAreaChange} />
                            </Col>
                        </Row>
                    )}

                    <Show>
                        <Show.When isTrue={total !== 0}>
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={size}
                                totalItemsCount={total}
                                pageRangeDisplayed={5}
                                onChange={handlePageClick}
                                innerClass="pagination-navigation"
                                linkClass="pagination-element"
                                activeLinkClass="active-page-li"
                            />
                        </Show.When>
                    </Show>

                </>
            }
        />);
    }
};

export default NewsList;

