import {IdentityService} from "../services/IdentityService";
import {IUser} from "../dto/identity/IUser";
import {useEffect, useState} from "react";

const useUsers = () => {
    const identityService = new IdentityService();
    const [users, setUsers] = useState<IUser[]>([])
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = async () => {
        await identityService.getUsers()
            .then(setUsers)
            .catch(e => {setError(e.message)})
            .finally(() => setPending(false))
    }

    useEffect(() => {
        fetch()
        return () => {
            setUsers([])
            setPending(true);
        }
    }, []);

    return {users, pending, error, fetch}
}

export default useUsers;