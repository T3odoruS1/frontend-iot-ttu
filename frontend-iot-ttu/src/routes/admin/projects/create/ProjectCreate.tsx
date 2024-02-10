import {ProjectService} from "../../../../services/ProjectService";
import {useNavigate} from "react-router-dom";
import CreateProjectFormWithPreview from "./CreateProjectFormWithPreview";
import {FieldValues} from "react-hook-form";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import Lottie from "lottie-react";
import animationData from "../../../../assets/lottieAnimations/done_check.json"
import {useState} from "react";
import {SuccessAlert} from "../../../../components/lottie/SuccessAlert";

const ProjectCreate = () => {

    const projectService = new ProjectService();
    const navigate = useNavigate();
    const [pending, setPending] = useState(false);

    const [success, setSuccess] = useState(false)
    const handleSubmit = async (data: FieldValues) => {
        setPending(true)
        const result = data as IProjectOutput;
        if (!result.id) {
            console.log(result)
            const response = await projectService.create(data as IProjectOutput);
            if (response !== undefined) {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false);
                    setPending(false)
                    navigate(`../`);
                }, 1000)

            }
        } else {
            projectService.update(result).then(r => {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false);
                    setPending(false)
                    navigate(`../`);
                }, 1000)
            }).catch(e => {
                alert("Error" + e.message)
            })

        }

    }


    return <>
        {success &&
            <SuccessAlert/>
        }
        {!success && <CreateProjectFormWithPreview onSubmit={handleSubmit}/>}
    </>
}

export default ProjectCreate;