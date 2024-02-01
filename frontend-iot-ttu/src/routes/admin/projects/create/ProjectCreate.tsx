import {ProjectService} from "../../../../services/ProjectService";
import {useNavigate} from "react-router-dom";
import CreateProjectFormWithPreview from "./CreateProjectFormWithPreview";
import {FieldValues} from "react-hook-form";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";

const ProjectCreate = () => {

  const projectService = new ProjectService() ;
  const navigate = useNavigate();

  const handleSubmit = async (data: FieldValues) => {
      console.log(data)
      const response = await projectService.create(data as IProjectOutput);
      if (response !== undefined) {
          navigate(`../`);
      }
  }



  return <><CreateProjectFormWithPreview onSubmit={handleSubmit}/></>
}

export default ProjectCreate;