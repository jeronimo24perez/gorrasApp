import Navbar from "../../shared/components/navbar.tsx";
import Footer from "../../shared/components/footer.tsx";
import {useParams} from "react-router";
import {useContext, useEffect, useState} from "react";
import Loader from "../../shared/components/loader.tsx";
import useCap from "../hooks/useCap.tsx";

import {LoginContext} from "../../users/context/loginContext.tsx";
import cacheSaver from "../../car/hooks/cacheSaver.ts";
import {useCart} from "../../car/hooks/useCart.tsx";
import {BaggageClaim, ShoppingCart} from "lucide-react";
const CapProduct = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [size, setSize] = useState<string>("m/s")
    const context = useContext(LoginContext)
    const [itemExists, setItemExists] = useState<boolean>(false)
    const {items, setItems} = useCart()
    const cap = useCap({ setIsLoading, id: id || "" })
    cacheSaver()

    useEffect(() => {
        const validateItem = async ()=>{
            const item = items.find(e => e.product === parseInt( id || ""))
            if(item){
                setItemExists(true)
            }
        }
        validateItem()
    }, [id, items]);

    function handleAddToCart(){
       fetch('https://gorras-backend-django-1ui3.vercel.app/cart/cart_item/',{
           method: "POST",
           headers: {
               "Content-Type": "application/json",
               "Authorization": localStorage.getItem("Authorization") || ""
           },
           body: JSON.stringify({
               cart: parseInt(localStorage.getItem("cartUser") || ""),
               product: parseInt(id || ""),
               quantity: 1
           })
       }).then(res => res.json()).then(data => {
           setItems([...items, data])
       })
    }
    function handleRemoveFromCart(){
        const item = items.find(e => e.product === parseInt(id || ""))
        if(!item){
            return
        }
        fetch(`https://gorras-backend-django-1ui3.vercel.app/cart/cart_item/${item.id || ""}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("Authorization") || ""
            }
        }).then(()=>{
            const update = items.filter(e => e.id !== item.id)
            setItems( update)
            setItemExists(false)
        })
    }
    return(
        isLoading? <Loader />:
        <>
            <Navbar />
            <div className=" w-full bg-stone-950 grid place-items-center">
                <div className=" cap-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3   rounded-xl bg-stone-800 gap-4 text-neutral-50 grid place-items-center">
                    <div className="img">
                        <img src={cap.image} className="max-h-96 rounded-t-xl sm:rounded-l-xl rounded-r-none" alt={cap.name} />
                    </div>
                    <div className="info md:col-span-2">
                       <h2 className="text-3xl font-bold"> {cap.name} </h2>
                        <p className="text-xl text-neutral-400">{cap.price}</p>
                        <p className="text-lg text-neutral-400">Talla</p>
                        <div className="selector flex gap-4">
                            <button className={size === "m/s"?"selector-item cursor-pointer bg-red-800 transition-colors   rounded-full   ": " rounded-full selector-item cursor-pointer bg-neutral-950 "} onClick={ () => setSize("m/s") } >
                                S/M
                            </button>
                            <button className={size === "l/xl"?"selector-item cursor-pointer bg-red-800 rounded-full transition-colors  ": "selector-item cursor-pointer bg-neutral-950 rounded-full"} onClick={ () => setSize("l/xl") } >
                                L/XL
                            </button>
                            <button className={size === "unica"?"selector-item cursor-pointer  rounded-full bg-red-800 transition-colors  ": "selector-item cursor-pointer bg-neutral-950  rounded-full "} onClick={ () => setSize("unica") } >
                                Unica
                            </button>
                        </div>
                        <div className="shop-buttons flex gap-4">
                            <button className="bg-red-700 transition-colors cursor-pointer hover:bg-red-950 w-5/12 btn-cards rounded-xl ">  Comprar</button>
                            {itemExists && context?.logged? <>
                                    <button  className="bg-red-700 transition-colors cursor-pointer flex justify-cente hover:bg-red-950 w-6/12 btn-cards rounded-xl " onClick={handleRemoveFromCart} ><BaggageClaim /> Quitar del carrito</button>
                                </>:
                                <button  className="bg-red-700 transition-colors cursor-pointer flex justify-cente hover:bg-red-950 w-6/12 btn-cards rounded-xl " onClick={handleAddToCart}   ><ShoppingCart /> Agregar al carrito</button>
                            }


                        </div>
                    </div>
                </div>

            </div>
            <Footer />

        </>
    )
}

export default CapProduct