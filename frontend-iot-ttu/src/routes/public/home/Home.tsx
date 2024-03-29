import CarouselComponent from "./CarouselComponent";
import {Col, Row} from "react-bootstrap";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import {ImageLinkContainer} from "../../../components/ImageLinkContainer";
import territory from './../../../assets/ttu-territory.jpeg'
import hall from './../../../assets/ttu-hall.jpeg'
import EditablePage from "../editablePage/EditablePage";
import {PartnerImages} from "../../admin/home/partnerImage/PartnerImages";
import {useTranslation} from "react-i18next";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const Home = () => {
    const {t} = useTranslation();
    useDocumentTitle(t("titles.home"))
    return <>
        <CarouselComponent/>
        <div className="home-page-content-container mt-5" id={"home-page-content"}>
            <Row>

                <Col lg={9} md={8}>
                    <EditablePage showTitle={false} pageIdentifier={"home_page"}/>
                </Col>
                <Col lg={3} md={4}>
                    <div className={"nav-images"}>
                        <div className="w-100">
                            <ImageLinkContainer image={territory} to={`./news`} label={t("public.header.news")}/>
                        </div>
                        <div className="w-100">
                            <ImageLinkContainer image={hall} to={`./contact`} label={t("public.header.contactUs")}/>
                        </div>
                    </div>
                </Col>
            </Row>

            <br/>
            <br/>
            <br/>
            <SubHeadingPurple>{t("partners.partners")}</SubHeadingPurple>

            <PartnerImages/>


        </div>
    </>
}

export default Home;