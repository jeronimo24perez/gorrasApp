import {useEffect, useState} from "react";
import type Cap from "../models/cap.ts";

export default function useBrand({id}: { id: string}) {
    const [caps, setCaps] = useState<Cap[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        async function fetchData() {
            const brand = await fetch(`https://backend-gorras-app.vercel.app/marcas/${id}`)
            const capsRes = await fetch(`https://backend-gorras-app.vercel.app/`)
            const data = await brand.json()
            const capsData = await capsRes.json()

            const filtered = capsData.filter((cap: Cap) => cap.marca === data.marca)
            setCaps(filtered)
            setIsLoading(false)

        }

        fetchData()
    }, [id]);

    return {caps, isLoading}
}