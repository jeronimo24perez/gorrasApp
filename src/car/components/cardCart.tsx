import type Cap from "../../caps/models/cap.ts";
import {useState} from "react";
import {useCart} from "../hooks/useCart.tsx";

const CardCart = ({name, image, id,  brand_name, price}:Cap) => {
    const [counter, setCounter] = useState<number>(1)
    const {items, setItems} = useCart()
    function handleRemoveCart(){
        const item = items.find(e => e.product === id)
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
        })
    }

    return(
        <>
            <div className={`flex items-center card-cart bg-stone-800 backdrop-blur-md   rounded-md p-3 gap-4 w-full ${brand_name}`} id={id.toString()}>

                {/* Imagen */}
                <div className="w-39 rounded-xl h-40 rounded flex items-center justify-center shrink-0">
                    <img src={image} alt={name} className="w-full h-full object-contain rounded rounded-l-xl" />
                </div>

                {/* Nombre */}
                <div className="flex-1 info-cart">
                    <p className="text-white text-xl font-bold text-sm">{name}</p>
                </div>

                {/* Precio + controles */}
                <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="text-white font-bold text-sm">
          {price}
        </span>

                    {/* Cantidad */}
                    <div className="controls grid grid-cols-3 place-items-center w-full  border border-gray-500 rounded ">
                        <button
                            className="px-2 py-1 text-white bg-[#2a2a2a] hover:bg-[#3a3a3a] text-sm"
                            onClick={() => {
                               if(counter > 0){

                                setCounter(counter - 1)
                               }
                            }}
                        >
                            -
                        </button>
                        <span className="text-neutral-50">{counter}</span>
                        <button onClick={() => setCounter(counter + 1)}
                            className="  text-white bg-[#2a2a2a] hover:bg-[#3a3a3a] text-sm"
                        >
                            +
                        </button>
                    </div>

                    {/* Eliminar */}
                    <button
                        className="text-red-500 hover:text-red-400 text-xs underline"
                        onClick={ handleRemoveCart}
                        id={id.toString()}
                    >
                        Eliminar
                    </button>
                </div>

            </div>
        </>
    )
}

export default CardCart