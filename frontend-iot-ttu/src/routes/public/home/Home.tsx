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
import i18n from "i18next";

const Home = () => {
    return <>
        <CarouselComponent/>
        <div className="home-page-content-container">
            <Row>

                <Col md={9}>
                    <div>
                        <SubHeadingPurple>About us</SubHeadingPurple>
                        <p>
                            The Embedded AI (Artificial Intelligence) Research Lab is an initiative started in 2016 to
                            strength the cooperation between TalTech and private sector companies. Initial focus was to
                            cover different aspects in Internet of Things field. As the industry needs are continuously
                            changing and there have been increasing interest on machine learning competence, the
                            research center was reorganized to provide better competence in embedded machine learning.
                            Depending on your needs we are closely cooperating with different departments and competence
                            areas all over the TalTech. Together we develop innovative technologies and apply them in
                            the industry to give you a competitive edge.
                        </p>
                        <br/>
                        <br/>
                        <br/>
                        <SubHeadingPurple>Objectives</SubHeadingPurple>
                        <ul>
                            <li className="home-page-li">
                                Create innovative applications and domain capability across verticals for industry needs
                                (Smart city, smart health, smart Industry, smart agriculture, Smart transportation)
                            </li>
                            <li className="home-page-li">
                                Energize Research mind-set and reduce costs in Research and Development by providing
                                neutral and interoperable, multi-technology stack laboratory facilities
                            </li>
                            <li className="home-page-li">
                                Reduce import dependency on IoT components and promote indigenization
                            </li>
                            <li className="home-page-li">
                                Provide environment for product Creation, Testing and also Validation
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="mb-3">
                        <ImageLinkContainer image={territory} to={`./news`} label={"Uudised!"}/>
                    </div>
                    <div className="mb-2">
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

            <br/>
            <br/>
            <br/>
            <SubHeadingPurple>Latest news</SubHeadingPurple>


        </div>
    </>
}

export default Home;