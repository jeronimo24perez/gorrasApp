import {createContext, type Dispatch, type SetStateAction} from "react";
import type CartItem from "../models/cartItem.tsx";
interface contextType {
    items: CartItem[];
    setItems: Dispatch<SetStateAction<CartItem[]>>
}
export const CartContext = createContext<contextType | null>(null);