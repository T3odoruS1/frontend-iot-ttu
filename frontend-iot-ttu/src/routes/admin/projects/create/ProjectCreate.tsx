import {ProjectService} from "../../../../services/ProjectService";
import {useNavigate} from "react-router-dom";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";

const ProjectCreate = () => {

  const projectService = new ProjectService() ;
  const navigate = useNavigate();

  const handleSubmit = async (data: IProjectOutput) => {
      const response = await projectService.create(data);
      if (response !== undefined) {
          navigate(``); // TODO path
      }
  }



  return <>Project create</>
}

export default ProjectCreate;