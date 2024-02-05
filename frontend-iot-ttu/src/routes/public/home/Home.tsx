import CarouselComponent from "./CarouselComponent";
import {Col, Row} from "react-bootstrap";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import {ImageLinkContainer} from "../../../components/ImageLinkContainer";
import territory from './../../../assets/ttu-territory.jpeg'
import hall from './../../../assets/ttu-hall.jpeg'
import telia from './../../../assets/partners/Telia.png'
import tallink from './../../../assets/partners/Tallink.png'
import kinema from './../../../assets/partners/kinema_.png'
import haridusmin from './../../../assets/partners/haridusmin.png'
import dfsd from './../../../assets/partners/dfsd.png'
import EditablePage from "../editablePage/EditablePage";

const Home = () => {
    return <>
        <CarouselComponent/>
        <div className="home-page-content-container">
            <Row>

                <Col lg={9} md={8}>
                    <EditablePage showTitle={false} pageIdentifier={"home_page"}/>
                </Col>
                <Col lg={3} md={4}>
                    <div className="m-3 home-page-link-container">
                        <ImageLinkContainer image={territory} to={`./news`} label={"Uudised!"}/>
                    </div>
                    <div className="m-3 home-page-link-container">
                        <ImageLinkContainer image={hall} to={`./contact`} label={"Kontakt!"}/>
                    </div>
                </Col>
            </Row>

            <br/>
            <br/>
            <br/>
            <SubHeadingPurple>Partners</SubHeadingPurple>


            <img className={"partner-image"} src={telia} alt={"Telia"}/>
            <img className={"partner-image"} src={haridusmin} alt={"Haridus ministeerium"}/>
            <img className={"partner-image"} src={dfsd} alt={"DFSD"}/>
            <img className={"partner-image"} src={tallink} alt={"Tallink"}/>
            <img className={"partner-image"} src={kinema} alt={"Kinema"}/>



        </div>
    </>
}

export default Home;