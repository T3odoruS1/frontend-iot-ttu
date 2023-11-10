import {IOpenSourceSolution} from "../../../dto/IOpenSourceSolution";
import PageTitle from "../../../components/common/PageTitle";
import {Col, Row} from "react-bootstrap";
import {OpenSourceSolutionElement} from "../../public/opensourcesolutions/OpenSourceSolutionElement";
import TopicAreaFilters from "../../../components/common/FilterBox";
import ButtonPrimary from "../../../components/common/ButtonPrimary";
import ButtonSmaller from "../../../components/common/ButtonSmaller";

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
        {id: "1", name: "Shrek"},
        {id: "1", name: "Hardcore coding"}]
    }
  ]

  return <>
    <PageTitle>Vabavaralised lahendused</PageTitle>
    <ButtonSmaller>Create</ButtonSmaller>
    {pending ? <p>Loading...</p> :
        (<Row className="flex-column flex-md-row">
          <Col className="col-md-10 order-md-0 order-1">
            <Row className="m-2">
              {solutions.map((solution) => {
                return <OpenSourceSolutionElement key={solution.id} data={solution}/>
              })}
            </Row>
          </Col>
          <Col className="filter-box px-md-4 col-md-2 order-md-1 order-0">
            <TopicAreaFilters/>
          </Col>
        </Row>)}
  </>
}

export default OpenSourceSolutionAdm;