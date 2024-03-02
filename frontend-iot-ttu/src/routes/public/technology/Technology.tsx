import EditablePage from "../editablePage/EditablePage";
import React from "react";
import {Col, Row} from "react-bootstrap";
import {ImageLinkContainer} from "../../../components/ImageLinkContainer";
import territory from "../../../assets/ttu-territory.jpeg";
import hall from "../../../assets/ttu-hall.jpeg";

const Technology = () => {
    const pageIdentifier = "technology_main"
    return <div>
        <Row>

            <Col lg={9} md={8}>
                <EditablePage showTitle={true} pageIdentifier={pageIdentifier}/>
            </Col>
            <Col lg={3} md={4}>
                <div className={"nav-images mr-2"}>
                    <div className="w-100">
                        <ImageLinkContainer image={territory} to={`./hardware`} label={"Available hardware"}/>
                    </div>
                    <div className="w-100">
                        <ImageLinkContainer image={hall} to={`./research`} label={"Research topics"}/>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}

export default Technology;