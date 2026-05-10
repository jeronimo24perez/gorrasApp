import Navbar from "../../shared/components/navbar.tsx";
import {useCart} from "../hooks/useCart.tsx";
import {useContext, useEffect, useState} from "react";
import type Cap from "../../caps/models/cap.ts";
import CardCart from "../components/cardCart.tsx";
import UseCacheSaver from "../hooks/cacheSaver.ts";
import Footer from "../../shared/components/footer.tsx";
import Loader from "../../shared/components/loader.tsx";
import {LoginContext} from "../../users/context/loginContext.tsx";
import {Link, useLocation} from "react-router";

const Cart = () => {
    const {items} = useCart()
    const [caps, setCaps] = useState<Cap[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const auth = localStorage.getItem("auth")
    useEffect(() => {

    }, [auth]);
    useEffect(() => {
        let products;
        const promiser = async ()=>{
            products = await Promise.all(
                items.map(async (e)=>{
                    const response = await fetch(`https://gorras-backend-django-1ui3.vercel.app/caps/${e.product}`)

                    return response.json()
                })
            )

        setCaps(products)
    }
    promiser().then(()=> setIsLoading(false))
    }, [items]);
    const context = useContext(LoginContext)
    UseCacheSaver()
    const location = useLocation()
    return(
        isLoading? <Loader />:
        context?.logged? <>
                {items.length < 1?
                    <>
                        <Navbar />
                        <div className="h-screen bg-neutral-950 grid place-items-center">
                            <Link to="/" className="text-red-700 underline hover:text-neutral-50  text-xl">No tienes nada en tu carrito, volver a la pagina principal</Link>
                        </div>
                    </>

                    :
                    <>
                        <Navbar />
                        <div className="cart-grid bg-neutral-950 grid gap-12">
                            {caps.map(item => <CardCart key={item.id}  id={item.id} name={item.name} price={item.price} brand={item.brand} image={item.image} brand_name={item.brand_name} />)}
                        </div>
                        <div className="total-price bg-neutral-950 text-neutral-50 grid place-items-center">
                            <button className="bg-red-700 transition-colors cursor-pointer hover:bg-red-950 w-5/12 btn-shop rounded-xl "> Finalizar compra</button>
                        </div>

                        <Footer />
                    </>
                }

            </>:
            <>
            <Navbar />
                <div className="h-screen bg-neutral-950 grid place-items-center">
                    <Link to="/login" state={{backgroundLocation: location}} className="text-red-700 underline hover:text-neutral-50  text-xl">Para acceder al carrito debes iniciar sesion</Link>
                </div>

            <Footer />
        </>
    )
}

export default Cart