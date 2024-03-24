import Show from "../../components/common/Show";
import { NotAuthenticated } from "./NotAuthenticated";

export const CheckLogin = () => {

    return (
        <>{!window.localStorage.getItem('jwt') && <NotAuthenticated/>}</>
    );
};
