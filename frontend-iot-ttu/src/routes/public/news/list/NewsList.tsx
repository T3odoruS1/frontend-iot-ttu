import {Col, Row} from "react-bootstrap";
import NewsElement from "./NewsElement";
import TopicAreaFilters from "../../../../components/common/FilterBox";
import PageTitle from "../../../../components/common/PageTitle";
import {useTranslation} from "react-i18next";
import {Loader} from "../../../../components/Loader";
import usePaginatedFetch from "../../../../hooks/usePaginatedFetch";
import {NewsService} from "../../../../services/NewsService";
import {INews} from "../../../../dto/news/INews";
import {useState} from "react";
import Pagination from "react-js-pagination";


const NewsList = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(6);
    const {data: news, pending, total, pageCount} =
        usePaginatedFetch<INews, NewsService>(new NewsService(), page - 1, size);

    const handlePageClick = (pageNumber: number) => {
        console.log(pageNumber)
        setPage(pageNumber)
    }


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
                    <Col className="filter-box col-md-3 order-md-1 order-0">
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
};

export default NewsList;
