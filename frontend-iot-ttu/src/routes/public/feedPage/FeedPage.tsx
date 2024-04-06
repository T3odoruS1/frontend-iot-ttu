import {FC, useEffect, useState} from "react";
import useFetch from "../../../hooks/useFetch";
import {IFeedPage} from "../../../dto/feedpage/page/IFeedPage";
import {FeedService} from "../../../services/FeedService";
import {Loader} from "../../../components/Loader";
import Collapse from "../../../components/Collapse";
import FeedPagePostElement from "../../admin/feedpage/post/FeedPagePostElement";
import {useTranslation} from "react-i18next";
import {Col, Row, Table} from "react-bootstrap";
import {IFeedPageCategory} from "../../../dto/feedpage/category/IFeedPageCategory";
import TopicAreaFilters from "../news/list/FilterBox";
import {useCollapse} from "react-collapsed";
import Show from "../../../components/common/Show";
import dropdownIcon from "../../../assets/iconpack/Dropdown Arrow Icon.svg";

interface IProps{
    pageIdentifier: string;
}

const FeedPage: FC<IProps> = ({pageIdentifier}) => {
    const {i18n} = useTranslation();
    const service = new FeedService();
    const {data, pending, error} =
        useFetch<IFeedPage>(service.getPage, [i18n.language, pageIdentifier]);

    const [activeCategory, setActiveCategory] =
        useState<IFeedPageCategory | undefined>(data?.feedPageCategories.at(0));

    useEffect(() => {
        if(data){
            setActiveCategory(data.feedPageCategories.at(0))
        }
    }, [pending]);

    const isInitiallyMobile = window.innerWidth < 768;
    const [isExpanded, setExpanded] = useState(!isInitiallyMobile);
    const [mobile, setMobile] = useState(isInitiallyMobile);
    const duration = 1000;
    const {getToggleProps, getCollapseProps} = useCollapse({isExpanded, duration});
    const {t} = useTranslation();

    useEffect(() => {
        const handleResize = () => {
            const isMobileNow = window.innerWidth < 768;
            if (mobile !== isMobileNow) {
                setMobile(isMobileNow);
                setExpanded(!isMobileNow);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobile]);

    return <>{(pending) && <Loader />}
        <Row className="flex-column flex-md-row mt-md-5 mt-2">
            <Col className="col-md-9 order-md-0 order-1 news-grid">
                <Row className={"p-md-0 p-2"}>
                    {activeCategory?.feedPageCategoryPost.map((post) => {
                        return <div key={post.id}><FeedPagePostElement post={post}/></div>
                    })}
                </Row>
            </Col>
            <Col  className="col-md-3 order-md-1 order-0 mb-2">
                <Show>
                    <Show.When isTrue={mobile}>
                        <div {...getToggleProps({
                            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                        })}>
                            <h1 className="w-100 unselectable ms-md-3 ms-0 mb-2">
                                {t("public.news.filters")}

                                <img
                                    alt={"dropdown"}
                                    src={dropdownIcon}
                                    className={`${isExpanded ? 'expanded-collapse-arrow' : 'collapse-arrow'} icon`}
                                />


                            </h1>
                        </div>
                    </Show.When>
                    <Show.Else>
                        <h1 className="w-100 unselectable ms-md-4 ps-md-1 ms-0 mb-2">
                            {t("public.news.filters")}
                        </h1>
                    </Show.Else>
                </Show>
                <div  {...getCollapseProps()}>
                {data?.feedPageCategories.map((category) => {
                    return <h4 key={category.id} onClick={() => setActiveCategory(category)}
                               className={activeCategory?.id === category.id ? "post-category-active clickable-pointer" : "post-category clickable-pointer"}>
                        {category.title}
                    </h4>
                })}
                </div>
            </Col>
        </Row>
        </>
}

export default FeedPage;