import Menu from "../ui/menu.jsx";
import {useEffect, useState} from "react";
import CardList from "../features/cardList.jsx";
import Footer from "../ui/footer.jsx";
import {FaCartArrowDown} from "react-icons/fa";
import {Link} from "react-router";
import Loader from "../ui/loader.jsx";

const Cart = ({usersGet})=>{
    const [data, setData] = useState(null)
    const [state, setState] = useState(null)
    const [cart, setCart] = useState(null)
    async function db(){
        if(localStorage.getItem('user')) {
            const users = await fetch(`https://backend-gorras-app.vercel.app/users/${localStorage.getItem("user")}`);
            return users.json();

        }else{
            return  null;
        }

    }
    useEffect(() => {
        db().then(async res => {
            setData(res)
            let productos;
            if(res ){
                 productos = await Promise.all(
                    res.car.map(async e => {
                        const r = await fetch(`https://backend-gorras-app.vercel.app/${e.productId}`)
                        const cartList = await r.json()

                        return cartList

                    })
                )
                setCart(productos)

            }else{
                productos = null;
                setCart([])

            }
            setState(true)
        })

    }, []);

    return(
        state?
        <>
            <Menu usersGet={usersGet} />
            {cart.length > 0?
            <>
                {cart.map(i => <CardList name={i.name} price={i.price} img={i.img} id={i._id} key={i._id} />)}
                <div className="container d-flex justify-content-center">
                    <button className="btn bg-custom w-50 border-black" >Comprar ahora</button>
                </div>
            </>:
            <>
                <div className="container text-center mt-5 mb-5 justify-content-center">
                    <h2> No tienes productos en el carrito</h2> <br/>
                    <FaCartArrowDown size={80} /><br/><br/>
                    <Link to={'/'} className="link-primary w-100" >volver a la pagina principal</Link>
                </div>
            </>
            }


            <Footer />
        </>
            :
        <Loader />
    )
}

export default Cart;