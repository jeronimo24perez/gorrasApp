import type Brands from "../models/brands.ts";
import {Link} from "react-router";

const BrandCard = ({_id, img, marca}:Brands) => {
    return(
        <>
            <Link to={"/marca/" + _id} className="border-1 transition-transform duration-300  hover:-translate-y-3 bg-neutral-100 border-neutral-50 rounded-xl brand-card grid place-items-center" id={_id}>
                <img src={img} alt={marca} className="rounded-xl" />
            </Link>
        </>
    )
}
export default BrandCard