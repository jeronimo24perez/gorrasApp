import {Link} from "react-router";

const Card = ({img, title, price, page,theme, size, id})=>{
    return(
        <div className={`col-12 col-md-6 col-lg-${size}  mb-5`}  >
            {page === 'home' ? <Link to={`/product/${id}`} className="text-decoration-none">
                <div className="card h-100 card-hover w-100 mx-auto rounded-3 cursor-pointer border-1 border-dark" data-bs-theme={theme} id={id}  >
                    <img
                        src={img}
                        className="card-img-top rounded-3"
                        alt="Descripción de la imagen"
                    />

                    <div >
                        {page === "home"?<h5 className="card-title text-capitalize  text-center">{title}</h5>: <></> }

                    </div>
                    {page === "home"? <span className="card-text text-center text-light w-100">${price}</span>: <></>}

                </div>
            </Link>:
                <Link to={`/marca/${id}`}>
                <div className="card h-100 card-hover w-100 mx-auto rounded-3 cursor-pointer border-1 border-dark" data-bs-theme={theme} id={id}  >
                <img
                    src={img}
                    className="card-img-top rounded-3"
                    alt="Descripción de la imagen"
                />

                <div >
                    {page === "home"?<h5 className="card-title text-capitalize  text-center">{title}</h5>: <></> }

                </div>
                {page === "home"? <span className="card-text text-center text-light w-100">${price}</span>: <></>}

            </div>
            </Link>
            }

        </div>
    )
}

export default Card;