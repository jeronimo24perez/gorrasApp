import Menu from "../ui/menu.jsx";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Footer from "../ui/footer.jsx";
import Loader from "../ui/loader.jsx";

const Product = ({ usersGet }) => {
    const [product, setProduct] = useState();
    const [state, setState] = useState(null);
    const [user, setUser] = useState(null);
    const { id } = useParams();

    async function fetching() {
        let user = null;
        const data = await fetch(`https://backend-gorras-app.vercel.app/${id}`);
        if (localStorage.getItem('user')) {
            user = await fetch(`https://backend-gorras-app.vercel.app/users/${localStorage.getItem('user')}`)
            return { data: await data.json(), userMaker: await user.json() };
        } else {
            return { data: await data.json() };
        }
    }

    useEffect(() => {
        fetching().then(res => {
            setProduct(res.data);
            setUser(res.userMaker)
            setState(true);
        })
    }, [])

    let fineAdition = null;

    return (
        state ?
            <>
                {user ?
                    <>
                        {user.car.map((item) => {
                            if (item.productId === id) {
                                fineAdition = true;
                            }
                        })}
                    </>
                    :
                    <></>
                }
                <Menu usersGet={usersGet} />

                {/* Diseño de Grid: Imagen a la izquierda, Contenido a la derecha */}
                <div className="container border-dark border-5 rounded-2 bg-dark text-light p-5  mb-3 mt-3 shadow-lg">
                    <div className="row align-items-center">

                        {/* Columna de la Imagen (6 de 12 unidades) */}
                        <div className="col-md-6 text-center">
                            <Link to={product.img}>
                                <img
                                    src={product.img}
                                    className="img-fluid rounded-5 card-hover cursor-pointer shadow"
                                    alt="product"
                                />
                            </Link>
                        </div>

                        {/* Columna de Información y Botones (6 de 12 unidades) */}
                        <div className="col-md-6 ps-md-5">
                            <h2 className="mb-3 mt-3 mt-md-0"> {product.name}</h2>
                            <p className="fs-4 mb-4"><b>Precio: </b> ${product.price} COP</p>
                            <div className="mb-4">
                                <label className="form-label d-block small text-uppercase fw-bold text-secondary">Talla:</label>
                                {/* 'btn-group-sm' hace que el selector sea pequeño */}
                                <div className="btn-group btn-group-sm w-80" role="group" aria-label="Selección de tallas">
                                    <input type="radio" className="btn-check" name="talla" id="tallaS" autoComplete="off" defaultChecked />
                                    <label className="btn btn-outline-light px-3" htmlFor="tallaS">S/M</label>

                                    <input type="radio" className="btn-check" name="talla" id="tallaL" autoComplete="off" />
                                    <label className="btn btn-outline-light px-3" htmlFor="tallaL">L/XL</label>

                                    <input type="radio" className="btn-check" name="talla" id="tallaU" autoComplete="off" />
                                    <label className="btn btn-outline-light px-3" htmlFor="tallaU">Única</label>
                                </div>
                            </div>
                            <div className="d-flex gap-3">
                                <button type="button" className="btn bg-custom border-light-subtle px-4 py-2">
                                    Comprar
                                </button>

                                {fineAdition ? (
                                    <button className="btn border-light bg-custom px-4 py-2" disabled>
                                        agregado
                                    </button>
                                ) : (
                                    <button className="btn border-light bg-custom px-4 py-2" onClick={() => {
                                        if (localStorage.getItem('login') === "true") {
                                            fetch(`https://backend-gorras-app.vercel.app/users/${localStorage.getItem('user')}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    compra: product._id,
                                                    cantidad: 1
                                                })
                                            }).then(res => res.json()).catch(err => console.log(err));
                                            setTimeout(() => {
                                                location.reload();
                                            }, 500)
                                        } else {
                                            // Regresamos al alert como solicitaste
                                            alert('Debes iniciar Sesion');
                                        }
                                    }}>
                                        agregar al carrito
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <Loader />
    )
}

export default Product;