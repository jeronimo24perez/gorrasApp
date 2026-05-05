import { useContext } from "react";
import {LoginContext} from "../context/loginContext.tsx";

export function useLogged() {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error("debe usarse dentro de un Provider");
    }

    return context;
}