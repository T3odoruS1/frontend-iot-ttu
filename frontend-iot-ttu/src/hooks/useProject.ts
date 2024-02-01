import {useEffect, useState} from "react";
import {IProject} from "../dto/project/IProject";
import {ProjectService} from "../services/ProjectService";
import i18n from 'i18next';

const useProject = (id: string) => {
    const [project, setProject] = useState<IProject | null>(null);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string| null>(null);

    const projectService = new ProjectService();

    const fetch = () => {
        projectService.getById(i18n.language, id)
            .then(setProject)
            .catch(e => setError(e.message)).finally(() => setPending(false));
    }

    useEffect(() => {
        fetch();
    }, [id, i18n.language]);

    return {project, pending, error}
 }

export default useProject;