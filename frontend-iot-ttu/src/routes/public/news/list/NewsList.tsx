import {Col, Row} from "react-bootstrap";
import NewsElement from "./NewsElement";
import TopicAreaFilters from "../../../../components/common/FilterBox";
import useNewsList from "../../../../hooks/useNewsList";
import PageTitle from "../../../../components/common/PageTitle";
import {useEffect} from "react";
import i18n from "i18next";

const NewsList = () => {

    const {news, pending} = useNewsList();

    return <>
        <PageTitle>Uudised</PageTitle>
        {pending ? <p>Loading...</p> :
            (<Row className="flex-column flex-md-row">
                <Col className="col-md-9 order-md-0 order-1">
                    <Row>
                        {news.map((article) => {
                            return <NewsElement key={article.id} news={article}/>;
                        })}
                    </Row>
                </Col>
                <Col className="filter-box col-md-3 order-md-1 order-0">
                    <TopicAreaFilters/>
                </Col>
            </Row>)}
    </>;
};

export default NewsList;
