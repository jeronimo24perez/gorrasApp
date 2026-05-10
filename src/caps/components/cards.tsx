import type Cap from "../models/cap.ts";
import {Link} from "react-router";
import {useCart} from "../../car/hooks/useCart.tsx";
import {useEffect, useState} from "react";
import cacheSaver from "../../car/hooks/cacheSaver.ts";

const Cards = ({id, name, price, image, brand_name}: Cap)=>{


    return(
        <>
            <Link to={`/cap/${id}`} className="card rounded-xl transition-transform duration-300  hover:-translate-y-3 bg-stone-800 text-neutral-50" id={id.toString()}>
                <div className="card-image">
                    <img className=' rounded-tl-xl rounded-tr-xl' src={image} alt={name} />
                </div>
                <div className="card-info">
                     <h2 className="font-bold ">{name}</h2>
                    <p><b>Marca:</b> {brand_name}</p>
                    <p><b>Precio </b>{price }  COP</p>
                </div>
                <div className="card-button flex justify-center">
                        <button  className="bg-red-700 transition-colors cursor-pointer hover:bg-red-950 w-full btn-cards rounded-xl ">Ver</button>
                </div>
            </Link>
        </>
    )
}

export default Cards