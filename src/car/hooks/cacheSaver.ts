import {  useEffect} from "react";
import {useCart} from "./useCart.tsx";
import type CartItem from "../models/cartItem.tsx";

function UseCacheSaver() {
    const {setItems} = useCart()
    useEffect(() => {
        const cartFetcher = async () => {
            const allCartItems = await fetch('https://gorras-backend-django-1ui3.vercel.app/cart/cart_item/',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Authorization') || ''
                }
            })
            const data = await allCartItems.json()
            const cartId = parseInt(localStorage.getItem('cartUser') || "0");
            const filteredItems = data.filter((e: CartItem) => e.cart === cartId);
            console.log(data)
            setItems(filteredItems)
            console.log(filteredItems)
            return data
        }

        cartFetcher()




    }, []);
}
export default UseCacheSaver