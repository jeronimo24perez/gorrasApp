import Navbar from "../../shared/components/navbar.tsx";
import banner from "../../assets/banner.png"
import {useEffect, useState} from "react";
import type Cap from "../models/cap.ts";
import Cards from "../components/cards.tsx";
import Footer from "../../shared/components/footer.tsx";
import Loader from "../../shared/components/loader.tsx";
const CapsPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
const [caps, setCaps] = useState<Cap[]>([])
    useEffect(() => {
        fetch("https://backend-gorras-app.vercel.app/")
        .then(res => res.json())
        .then(data => {
            setCaps(data)
            setIsLoading(false)
        })
    }, []);
    return(

            isLoading? <Loader/> :

                <>
                    <Navbar/>
                    <div className="banner grid place-items-center  bg-stone-950 w-full">
                        <img src={banner} className={"rounded-xl"} alt="banner"/>
                    </div>
                    <div
                        className="grid card-grid bg-neutral-950 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                        {caps.map(cap => <Cards key={cap._id} _id={cap._id} marca={cap.marca} name={cap.name} price={cap.price}
                                                img={cap.img}/>)}
                    </div>
                    <Footer/>
                </>

    )
}

export default CapsPage