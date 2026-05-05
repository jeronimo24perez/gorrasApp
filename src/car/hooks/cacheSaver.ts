import {  useEffect} from "react";
import {useCart} from "./useCart.tsx";

function UseCacheSaver() {
    const {setItems} = useCart()
    useEffect(() => {

        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            setItems(JSON.parse(cartItems));
        }
    }, []);
}
export default UseCacheSaver