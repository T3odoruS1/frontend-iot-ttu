import {ProjectService} from "../../../../services/ProjectService";
import {useNavigate} from "react-router-dom";
import CreateProjectFormWithPreview from "./CreateProjectFormWithPreview";
import {FieldValues} from "react-hook-form";
import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import {useState} from "react";
import {SuccessAlert} from "../../../../components/lottie/SuccessAlert";
import Show from "../../../../components/common/Show";
import {Loader} from "../../../../components/Loader";

const ProjectCreate = () => {

    const projectService = new ProjectService();
    const navigate = useNavigate();
    const [pending, setPending] = useState(false);

    const [success, setSuccess] = useState(false)

    const onSuccess = () =>{
        setSuccess(true);
        setPending(false);
        setTimeout(() => {
            setSuccess(false);

            navigate(`../`);
        }, 1000)
    }
    const handleSubmit = async (data: FieldValues) => {
        setPending(true)
        const result = data as IProjectOutput;
        if (!result.id) {
            projectService.create(data as IProjectOutput).then((response) => {
                if (response !== undefined) {
                    onSuccess();
                }
            }).catch(e => {
                alert("Error" + e.message)
            });

        } else {
            projectService.update(result).then(r => {
                onSuccess();
            }).catch(e => {
                alert("Error" + e.message)
            });
        }

    }


    return <>
        <Show>
            <Show.When isTrue={pending}><Loader/></Show.When>
        </Show>
        <Show>
            <Show.When isTrue={success}><SuccessAlert/></Show.When>
        </Show>
        <Show>
            <Show.When isTrue={!success}><CreateProjectFormWithPreview onSubmit={handleSubmit}/></Show.When>
        </Show>
    </>
}

export default ProjectCreate;