import {useEffect, useState} from "react";
import i18n from "i18next";
import {ProjectService} from "../services/ProjectService";
import {IProject} from "../dto/project/IProject";

const useProjectList = () => {
    const projectService = new ProjectService();
    const [projects, setProjects] = useState<IProject[]>([]);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const remove = projectService.remove;
    const fetch = async () => {
        await projectService.getAll(i18n.language)
            .then(setProjects)
            .catch(e => setError(e.message))
            .finally(() => setPending(false));
    }

    useEffect(() => {
        fetch();
        return () => {
            setProjects([]);
            setPending(true);
        }
    }, [i18n.language]);

    return {projects, setProjects, pending, remove, error}
}

export default useProjectList;