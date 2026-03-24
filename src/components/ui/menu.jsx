import logo from '../../assets/logo-2.png'
import {FaAccessibleIcon, FaCartPlus, FaCircle, FaSearch, FaUser, FaUserCircle} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import {MdAccountBox, MdAccountCircle, MdOutlineNotifications} from "react-icons/md";
import {Link} from "react-router";
import Login from "../features/login.jsx";
import Search from "../features/search.jsx";
import {useEffect, useState} from "react";
import Loader from "./loader.jsx";

const Menu = ({usersGet}) => {
    const [user, setUser] = useState();
    const [state, setState] = useState(null);

    async function  fetching(){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let data;
        if(localStorage.getItem('user')){
            data = await fetch(`https://backend-gorras-app.vercel.app/users/${localStorage.getItem('user')}`);
            return await data.json();

        }else{
            data = null;
            return data;
        }


    }
    useEffect(()=>{
        fetching().then(res => {
            setUser(res);
            setState(true)
        })
    }, [])
    return (
        state?
        localStorage.getItem('login') === 'true'?<>
                <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img
                                src={logo}
                                alt="Logo"
                                width="200"
                                height="64"
                                className="d-inline-block align-text-top"
                            />
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <Link className="nav-link active text-light" aria-current="page" to="/">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/marcas">Marcas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to='/contacto'>Contacto</Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav d-flex w-50  align-items-center">


                                <li className="nav-item px-2 w-100">
                                    <Link className="nav-link text-light" to='/compras' aria-label="Carrito">
                                        {user.car.length >= 1? <><FaCircle size={11} className="notification" /> <FaCartShopping /></> : <FaCartShopping />}    <span >Carrito</span>
                                    </Link>
                                </li>
                                <li className='nav-item px-2 w-100'>
                                    <Link className="nav-link d-flexz align-items-center login-link text-light dropdown-toggle"
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false" >
                                        <FaUser className="" onClick={()=>{

                                        }} /> <span>Cuenta</span>
                                    </Link>
                                    {/*desplegable*/}
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            {/* Opción de cerrar sesión con estilo destacado */}
                                            <a className="dropdown-item text-danger" href="#" onClick={()=> {localStorage.setItem('login', 'false'); setTimeout(()=>{
                                                window.location.reload()
                                            }, 1000)}} >
                                                Cerrar sesión
                                            </a>
                                        </li>
                                    </ul>

                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        : <>
                <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img
                                src={logo}
                                alt="Logo"
                                width="200"
                                height="64"
                                className="d-inline-block align-text-top"
                            />
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <Link className="nav-link active text-light" aria-current="page" to="/">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/marcas">Marcas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to='/contacto'>Contacto</Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav d-flex w-50  align-items-center">
                                <li className="nav-item px-2 w-100">
                                    <Link className="nav-link d-flexz align-items-center login-link text-light" to='/login' data-bs-toggle="modal"
                                          data-bs-target="#loginModal">
                                        <FaUser className=""  /> <span>Iniciar  Sesion</span>
                                    </Link>
                                </li>

                                <li className="nav-item px-2 w-100">
                                    <Link className="nav-link text-light" to='/compras' aria-label="Carrito">
                                        <FaCartShopping /> <span >Carrito</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Login usersGet={usersGet} />
            </>
:<></>
    )
}

export default Menu