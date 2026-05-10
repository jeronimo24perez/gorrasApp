    import logo from '../../assets/logo2.png'
    import {CircleUserRound, Contact, House, ShoppingCart, Tags, User} from "lucide-react";
    import {useContext, useEffect, useState} from "react";
    import {Link, useLocation} from "react-router";
    import {LoginContext} from "../../users/context/loginContext.tsx";
    const Navbar = () => {
        const [burger, setBurger] = useState<boolean>(false)
        const location = useLocation()
        const [logout, setLogout] = useState<boolean>(false)
        const context = useContext(LoginContext)
        useEffect(() => {
            if(localStorage.getItem("auth")=== "true"){
                context?.setLogged(true)
            }
           
        }, [context]);
        return(
            <>
                <nav className="w-full   bg-stone-900 text-neutral-50 font-bold ">

                        <ul className="grid grid-cols-4 md:grid-cols-8 place-items-center">
                            <li className="burger cursor-pointer md:hidden" id={burger? "burger-open": ""} onClick={() => setBurger(!burger)} >
                                <div id="bar-1"></div>
                                <div id="bar-2"></div>
                                <div id="bar-3"></div>
                            </li>
                            <Link to={'/'} className="col-start-2  md:col-start-1  col-span-2">
                                <img className="transition-transform cursor-pointer h-full duration-300  hover:scale-90" src={logo} width={200} alt={"Capstore"} />
                            </Link>
                            <Link to={'/'} className=" hidden md:grid cursor-pointer transition-colors duration-300 hover:text-red-700">
                                Inicio
                            </Link>
                            <Link to={'/marcas'} className="hidden md:grid  cursor-pointer transition-colors duration-300 hover:text-red-700">
                                Marcas
                            </Link>
                            <Link to={'/contacto'} className="hidden md:grid  cursor-pointer transition-colors duration-300 hover:text-red-700">
                                Contacto
                            </Link>
                            <div className="icons flex gap-4 md:col-start-8">
                                <Link to={'/carrito'} className="cursor-pointer  justify-self-end transition-colors duration-300 hover:text-red-700">
                                    <ShoppingCart />
                                </Link>
                                {context?.logged?
                                    <li onClick={()=> {
                                        if(logout){
                                            setLogout(false)
                                        }else{
                                            setLogout(true)
                                        }
                                    }}>
                                        <CircleUserRound className="cursor-pointer  justify-self-start transition-colors duration-300 hover:text-red-700"  />
                                    </li>
                                    :

                                <Link to="/login" state={{backgroundLocation: location}} className="cursor-pointer  justify-self-start transition-colors duration-300 hover:text-red-700">
                                    <User />
                                </Link>}
                            </div>

                        </ul>


                </nav>
                {
                    logout && context?.logged === true ?  <div className="absolute logout right-7  bg-red-700 rounded-full text-neutral-50 p-2 cursor-pointer transition-colors duration-300 hover:bg-red-900">
                        <p onClick={()=>{
                            localStorage.removeItem("auth")
                            localStorage.removeItem("Authorization")
                            setLogout(false)
                             context?.setLogged(false)

                        }}>Cerrar Sesion</p>
                    </div>: <></>
                }

                {burger?
                    <div className="dropdown-menu b md:hidden  bg-stone-900  text-neutral-50  " id="dropdown-menu">
                        <ul className="grid gap-8 ">
                            <Link to={'/'}  className="flex items-center cursor-pointer transition-colors duration-300  hover:text-red-700" ><House /> Inicio</Link>
                            <Link to={'/marcas'}  className="flex items-center cursor-pointer transition-colors duration-300  hover:text-red-700" ><Tags /> Marcas</Link>
                            <Link to={'/contacto'}  className="flex items-center cursor-pointer transition-colors duration-300  hover:text-red-700" ><Contact /> Contacto</Link>
                        </ul>
                    </div>
                    :
                    <></>
                }


            </>
        )
    }

    export default Navbar
