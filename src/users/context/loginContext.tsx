import {createContext, type Dispatch, type SetStateAction} from "react";
interface contextType {
    logged: boolean;
    setLogged: Dispatch<SetStateAction<boolean>>
}
export const LoginContext = createContext<contextType | null>(null);