import Navbar from "../../shared/components/navbar.tsx";
import {useCart} from "../hooks/useCart.tsx";
import {useEffect, useState} from "react";
import type Cap from "../../caps/models/cap.ts";
import CardCart from "../components/cardCart.tsx";
import UseCacheSaver from "../hooks/cacheSaver.ts";
import Footer from "../../shared/components/footer.tsx";
import Loader from "../../shared/components/loader.tsx";

const Cart = () => {
    const {items} = useCart()
    const [caps, setCaps] = useState<Cap[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        let products;
        const promiser = async ()=>{

            products = await Promise.all(
                items.map(async (e)=>{
                    const response = await fetch(`https://backend-gorras-app.vercel.app/${e.productId}`)

                    return response.json()
                })
            )

        setCaps(products)
    }
    promiser().then(()=> setIsLoading(false))
    }, [items]);
    UseCacheSaver()
    return(
        isLoading? <Loader />:
        <>
            <Navbar />
            <div className="cart-grid bg-neutral-950 grid gap-12">
                {caps.map(item => <CardCart key={item._id}  _id={item._id} name={item.name} price={item.price} img={item.img} marca={item.marca} />)}
            </div>
            <div className="total-price bg-neutral-950 text-neutral-50 grid place-items-center">
                <button className="bg-red-700 transition-colors cursor-pointer hover:bg-red-950 w-5/12 btn-shop rounded-xl "> Finalizar compra</button>
            </div>

            <Footer />
        </>
    )
}

export default Cart