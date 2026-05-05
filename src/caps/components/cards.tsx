import type Cap from "../models/cap.ts";
import {Link} from "react-router";

const Cards = ({_id, name, price, img, marca}: Cap)=>{
    return(
        <>
            <Link to={`/cap/${_id}`} className="card rounded-xl transition-transform duration-300  hover:-translate-y-3 bg-stone-800 text-neutral-50" id={_id}>
                <div className="card-image">
                    <img className=' rounded-tl-xl rounded-tr-xl' src={img} alt={name} />
                </div>
                <div className="card-info">
                     <h2 className="font-bold ">{name}</h2>
                    <p><b>Marca:</b> {marca}</p>
                    <p><b>Precio </b>{price}</p>
                </div>
                <div className="card-button flex gap-4">
                    <button className="bg-red-700 transition-colors cursor-pointer hover:bg-red-950 w-5/12 btn-cards rounded-xl ">Comprar</button>
                    <button  className="bg-red-700 transition-colors cursor-pointer hover:bg-red-950 w-5/12 btn-cards rounded-xl ">Agregar al carrito</button>
                </div>
            </Link>
        </>
    )
}

export default Cards