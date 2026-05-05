import Navbar from "../../shared/components/navbar.tsx";
import Footer from "../../shared/components/footer.tsx";
import {useParams} from "react-router";
import {useContext, useState} from "react";
import Loader from "../../shared/components/loader.tsx";
import useCap from "../hooks/useCap.tsx";
import {BaggageClaim, ShoppingCart} from "lucide-react";
import {useCart} from "../../car/hooks/useCart.tsx";
import type CartItem from "../../car/models/cartItem.tsx";
import UseCacheSaver from "../../car/hooks/cacheSaver.ts";
import {LoginContext} from "../../users/context/loginContext.tsx";
import Swal from "sweetalert2";
const CapProduct = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [size, setSize] = useState<string>("m/s")
    const cap = useCap({ setIsLoading, id: id || "" })
    const {items, setItems} = useCart()
    const itemExists = items.find(item => item.productId === id);
    const context = useContext(LoginContext)
    UseCacheSaver()


    function addToCart() {
        if(!context?.logged) {
            Swal.fire({
                title: "Error",
                text: "Debes iniciar sesion para poder agregar productos al carrito",
                icon: "error",
                background: "#292524",
                confirmButtonColor: "#C10007",
                color: "#fff"
            })
            return;
        }
        if (itemExists) {
            return;

        } else {
            const newItem: CartItem = { productId: id || "", cantidad: 1 };
            setItems([...items, newItem]);
            localStorage.setItem("cartItems", JSON.stringify([...items, newItem]));
        }
    }
    function removeFromCart() {
        if (itemExists) {
            const newItems = items.filter(item => item.productId !== id);
            setItems(newItems);
            }
    }
    return(
        isLoading? <Loader />:
        <>

            <Navbar />
            <div className=" w-full bg-stone-950 grid place-items-center">
                <div className=" cap-container grid-cols-1 sm:grid-cols-2 md:grid-cols-3   rounded-xl bg-stone-800 gap-4 text-neutral-50 grid place-items-center">
                    <div className="img">
                        <img src={cap.img} className="max-h-96 rounded-t-xl sm:rounded-l-xl rounded-r-none" alt={cap.name} />
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
                                    <button  className="bg-red-700 transition-colors cursor-pointer flex justify-cente hover:bg-red-950 w-6/12 btn-cards rounded-xl " onClick={removeFromCart} ><BaggageClaim /> Quitar del carrito</button>
                                </>:
                                <button  className="bg-red-700 transition-colors cursor-pointer flex justify-cente hover:bg-red-950 w-6/12 btn-cards rounded-xl " onClick={addToCart} ><ShoppingCart /> Agregar al carrito</button>
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