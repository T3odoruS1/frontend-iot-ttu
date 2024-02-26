import CarouselComponent from "./CarouselComponent";
import {Col, Row} from "react-bootstrap";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import {ImageLinkContainer} from "../../../components/ImageLinkContainer";
import territory from './../../../assets/ttu-territory.jpeg'
import hall from './../../../assets/ttu-hall.jpeg'
import EditablePage from "../editablePage/EditablePage";
import {PartnerImages} from "../../admin/home/partnerImage/PartnerImages";
import {useTranslation} from "react-i18next";

const Home = () => {
    const {t} = useTranslation();

    return <>
        <CarouselComponent/>
        <p>Added this text to be sure that deployment works correctly</p>
        <div className="home-page-content-container">
            <Row>

                <Col lg={9} md={8}>
                    <EditablePage showTitle={false} pageIdentifier={"home_page"}/>
                </Col>
                <Col lg={3} md={4}>
                    <div className="m-3 home-page-link-container">
                        <ImageLinkContainer image={territory} to={`./news`} label={t("public.header.news")}/>
                    </div>
                    <div className="m-3 home-page-link-container">
                        <ImageLinkContainer image={hall} to={`./contact`} label={t("public.header.contactUs")}/>
                    </div>
                </Col>
            </Row>

            <br/>
            <br/>
            <br/>
            <SubHeadingPurple>{t("partners.partners")}</SubHeadingPurple>


            {/*<img className={"partner-image"} src={telia} alt={"Telia"}/>*/}
            {/*<img className={"partner-image"} src={haridusmin} alt={"Haridus ministeerium"}/>*/}
            {/*<img className={"partner-image"} src={dfsd} alt={"DFSD"}/>*/}
            {/*<img className={"partner-image"} src={tallink} alt={"Tallink"}/>*/}
            {/*<img className={"partner-image"} src={kinema} alt={"Kinema"}/>*/}

            <PartnerImages/>


        </div>
    </>
}

export default Home;