import type Cap from "../models/cap.ts";

import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
interface useCapProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    id: string;
}
export default function useCap({setIsLoading, id}:useCapProps) {
    const [cap, setCap] = useState<Cap | null>(null)
    useEffect(() => {
        let cancelled = false;

        const fetchData = async ()=> {
            try{
                const fetchCap = await fetch(`https://backend-gorras-app.vercel.app/${id}`)
                const data = await fetchCap.json()
                if(data === null){
                    console.error("No se puede acceder a la gorra")
                    return ;
                }
                if (!cancelled) {
                    setCap(data);
                    setIsLoading(false);
                }
            }catch (err){
                console.error(err)
            }

        }
        void fetchData()
        return () => {
            cancelled = true;
        }
    }, [id, setCap, setIsLoading]);

    return cap as Cap

}