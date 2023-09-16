import { Outlet } from "react-router-dom";
import PageTitle from "../../../components/common/PageTitle";

const News = () => {
  return <>
      <PageTitle >Uudised</PageTitle>
  <Outlet/></>;
}

export default News;