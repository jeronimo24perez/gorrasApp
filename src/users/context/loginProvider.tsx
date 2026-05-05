import {type ReactNode,  useState} from "react";
import {LoginContext} from "./loginContext.tsx";

const LoginProvider = ({children}: {children: ReactNode})=>{
    const [logged, setLogged] = useState<boolean>(false)
    return(
        <>
            <LoginContext.Provider value={{logged, setLogged}}>
                {children}
            </LoginContext.Provider>
        </>
    )
}
export default LoginProvider