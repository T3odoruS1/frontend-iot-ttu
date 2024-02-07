import {IOpenSourceSolution} from "../../../dto/IOpenSourceSolution";
import PageTitle from "../../../components/common/PageTitle";
import {Col, Row} from "react-bootstrap";
import TopicAreaFilters from "../../../components/common/FilterBox";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import Popup from "../../../components/Popup";
import {OpenSourceElementCard} from "../../public/opensourcesolutions/OpenSourceElementCard";
import {OpenSourceSolutionRequestPopup} from "../../public/opensourcesolutions/OpenSourceSolutionRequestPopup";
import OpensourceSolutionCreatePopup from "./create/OpensourceSolutionCreatePopup";

const OpenSourceSolutionAdm = () => {
  const pending = false;
  const solutions: IOpenSourceSolution[] = [
    {
      id: "1",
      title: "Some repo 1",
      description: "Here is some description of this repo. Some cool stuff in it.",
      topicAreas: [
        {id: "1", name: "Programming"},
        {id: "1", name: "Java"},
        {id: "1", name: "Apple"}]
    },
    {
      id: "2",
      title: "Some repo 2",
      description: "Here is other description. Check this repo out. There is Shrek photos",
      topicAreas: [
        {id: "1", name: "5G"},
        {id: "1", name: "Robotics"}]
    }
  ]

  return <>
    <PageTitle>Vabavaralised lahendused</PageTitle>
    <Popup trigger={<ButtonSmaller>Create</ButtonSmaller>}
           content={<OpensourceSolutionCreatePopup/>}/>
    {pending ? <p>Loading...</p> :
        (<Row className="flex-column flex-md-row">
          <Col className="col-md-10 order-md-0 order-1">
            <Row className="m-2 px-0">
              {solutions.map((solution) => {
                return <Popup
                    trigger={<OpenSourceElementCard data={solution}/>}
                    content={<OpenSourceSolutionRequestPopup />}
                    cname={"my-2"}
                    key={solution.id}
                />
              })}
            </Row>
          </Col>
          <Col className="filter-box px-md-4 col-md-2 order-md-1 order-0">
            {/*<TopicAreaFilters/>*/}
          </Col>
        </Row>)}
  </>
}

export default OpenSourceSolutionAdm;