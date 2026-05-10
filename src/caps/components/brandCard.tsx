import type Brands from "../models/brands.ts";
import {Link} from "react-router";

const BrandCard = ({id, image, brand}:Brands) => {
    return(
        <>
            <Link to={"/marca/" + id} className="border-1 transition-transform duration-300  hover:-translate-y-3 bg-neutral-100 border-neutral-50 rounded-xl brand-card grid place-items-center" id={id.toString()}>
                <img src={image} alt={brand} className="rounded-xl" />
            </Link>
        </>
    )
}
export default BrandCard