import {type ReactNode, useState} from "react";
import {CartContext} from "./context.tsx";
import type CartItem from "../models/cartItem.tsx";

const CartProvider = ({children}: {children: ReactNode})=>{
    const [items, setItems] = useState<CartItem[]>([])
    return(
        <CartContext.Provider value={{items, setItems}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider