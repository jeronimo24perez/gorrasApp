import Menu from "../ui/menu.jsx";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import Footer from "../ui/footer.jsx";
import Loader from "../ui/loader.jsx";

const Product = ({usersGet})=>{
    const [product, setProduct] = useState();
    const [state, setState] = useState(null);
    const [user, setUser] = useState(null);
    const {id} = useParams()

    async function  fetching(){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let user = null;
        const data = await fetch(`https://backend-gorras-app.vercel.app/${id}`);
        if(localStorage.getItem('user')){
            user = await fetch(`https://backend-gorras-app.vercel.app/users/${localStorage.getItem('user')}`)
            return {data: await data.json(), userMaker: await user.json()};

        }else{
            return {data: await data.json()};

        }

    }
    useEffect(()=>{
        fetching().then(res => {
            setProduct(res.data);
            setUser(res.userMaker)
            setState(true);
        })
    }, [])

    let fineAdition = null;
    return (
        state?

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
                <Menu usersGet={usersGet}/>
                <div
                    className={"container bg-dark text-light p-4 rounded-5 d-flex flex-wrap justify-content-center align-items-center mb-3 mt-3"}>
                    <Link to={product.img}> <img src={product.img} className="rounded-5 card-hover cursor-pointer "
                                                 alt="product"/></Link>
                    <h2 className="text-center w-100"> {product.name}</h2>
                    <p className=" w-100 text-center "><b>Precio: </b> ${product.price} COP</p><br/>
                    <button type="button" className="btn bg-custom me-5 border-light-subtle">Comprar</button>
                    {fineAdition ? <button className="btn border-light ml-5 bg-custom">agregado</button> :
                        <button className="btn border-light ml-5 bg-custom" onClick={() => {
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
                                }).then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err));
                                setTimeout(() => {
                                    location.reload();
                                }, 500)
                            } else {
                                alert('Debes iniciar Sesion')
                            }

                        }}>agregar al carrito</button>}

                </div>
                <Footer/>
            </> : <Loader/>
    )
}

export default Product