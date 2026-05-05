import Navbar from "../../shared/components/navbar.tsx";
import {useEffect, useState} from "react";
import type Brands from "../models/brands.ts";
import Loader from "../../shared/components/loader.tsx";
import BrandCard from "../components/brandCard.tsx";
import Footer from "../../shared/components/footer.tsx";

const BrandPage = () => {
    const [brands, setBrands] = useState<Brands[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const brandsFetcher = async ()=>{
            const response = await fetch('https://backend-gorras-app.vercel.app/marcas')
            const data = await response.json()
            setBrands(data)
            setIsLoading(false)
        }
        brandsFetcher()
    }, []);
    return(
        isLoading? <Loader />:
        <>
        <Navbar />
        <div className="brand-grid bg-neutral-950 grid grid-cols-1 md:grid-cols-2 gap-12">
            {brands.map(brand =>
                <BrandCard marca={brand.marca} img={brand.img} _id={brand._id} key={brand._id} /> )}
        </div>
        <Footer />
        </>
    )
}

export default BrandPage