import {useEffect, useState} from "react";
import {ProjectService} from "../services/ProjectService";
import {IProjectMultilang} from "../dto/project/IProjectMultilang";

const useUpdatableProject = (id: string | undefined) => {
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const service = new ProjectService();
    const [project, setProject] = useState<IProjectMultilang |null>(null);
    const update = service.update;

    const fetch = async (id: string) => {
        service.getPreview(id)
            .then(setProject)
            .catch(e => setError(e.message))
            .finally(() => setPending(false));
    }

    useEffect(() => {
        if(id !== undefined){
            fetch(id);
        }
    }, [id]);

    return {project, pending, error, update}
}

export default useUpdatableProject;