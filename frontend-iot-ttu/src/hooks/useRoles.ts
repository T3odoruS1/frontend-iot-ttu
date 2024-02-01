import {IdentityService} from "../services/IdentityService";
import {useEffect, useState} from "react";
import {IRole} from "../dto/identity/IRole";


const useRoles = () => {
    const identityService = new IdentityService();
    const [roles, setRoles] = useState<IRole[]>();
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = async () => {
        identityService.getAllRoles()
            .then(setRoles)
            .catch(e => setError(e.message))
            .finally(() => setPending(false))
    }

    useEffect(() => {
        fetch();
        return () => {
            setRoles([]);
            setPending(true);
        }
    }, []);

    return {roles, pending, error}
}

export default useRoles