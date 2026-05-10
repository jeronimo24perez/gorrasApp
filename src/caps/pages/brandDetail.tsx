import Navbar from "../../shared/components/navbar.tsx";
import useBrand from "../hooks/useBrand.tsx";
import {useParams} from "react-router";
import Cards from "../components/cards.tsx";
import Loader from "../../shared/components/loader.tsx";
import Footer from "../../shared/components/footer.tsx";

const BrandDetail = () => {
    const {id} = useParams()
    const brand = useBrand({id: id || ""
})

    return(
        brand.isLoading? <Loader />:
        <>
            <Navbar />
            <div
                className="grid card-grid bg-neutral-950 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                {brand.caps.length < 1 &&
                    <div className="no-products h-screen bg-neutral-950 text-neutral-50 ">
                        <h1 className="text-5xl">No hay productos de esta marca</h1>

                    </div>
                }
            {
                brand.caps.map(cap => <Cards key={cap.id} id={cap.id} name={cap.name} price={cap.price} image={cap.image} brand={cap.brand} brand_name={cap.brand_name} />)
            }
            </div>
            <Footer />
        </>
    )
};

export default BrandDetail