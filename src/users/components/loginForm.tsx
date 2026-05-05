import {type ChangeEvent, useState, type MouseEvent} from "react";
import type {LoginForm} from "../models/user.tsx";
import {useNavigate} from "react-router";
import {X} from "lucide-react";
import UseLogin from "../hooks/useLogin.tsx";

export const LoginFormComponent = () => {
    const [register, setRegister] = useState<boolean>(false)
    const [form, setForm] = useState<LoginForm>({
        name: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    const {submit} = UseLogin({
        email: form.email,
        password: form.password,
        name: "name" in form ? form.name : "",
        register: register
    } )
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.id]: e.target.value})
    }

    function handleSubmit(e: MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        submit()
    }
    return(
        <>
            <div className="modal fixed top-0  bg-black/60 backdrop-blur-sm w-full h-screen">
                <div className="grid place-items-center items-center p-8">
                    <form className="bg-stone-800 rounded-2xl  w-full max-w-md">

                        <X onClick={()=> navigate(-1)} className="cursor-pointer text-red-700 hover:text-neutral-50 transition-colors" />
                        <h2 className="text-center text-2xl font-bold text-white mb-6">
                            {register? "Registrate" :"Inicia Sesion"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {register?
                                <input
                                    type="text"  placeholder="Nombre Completo"
                                    className="backdrop-blur-md  rounded-full rounded-lgtext-white placeholder-gray-500 text-neutral-50 outline-none border-1 focus:border-red-500 transition"
                                    id="name"
                                    value={"name" in form ? form.name : ""}
                                    onChange={handleChange}
                                />
                                : <>  </>

                            }
                            <input
                                type="email"  placeholder="nombre@ejemplo.com"
                                className="backdrop-blur-md  rounded-full rounded-lgtext-white placeholder-gray-500 text-neutral-50 outline-none border-1 focus:border-red-500 transition"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <input
                                id="password"
                                type="password"
                                placeholder="Contrasena"
                                value={form.password} onChange={handleChange}
                                className="backdrop-blur-md rounded-full rounded-lgtext-white  text-white outline-none border-1 focus:border-red-500 transition"
                            />

                            <button className="bg-red-700 cursor-pointer hover:bg-red-800 text-white font-semibold  rounded-lg transition" onClick={handleSubmit}>
                                {register? "Registrarse" :"Iniciar Sesion"}
                            </button>
                            {
                                register? <p className="text-neutral-50">Ya tienes cuenta? <b className="text-red-800 underline hover:text-neutral-50 cursor-pointer" onClick={()=> setRegister(false)}>Iniciar Sesion</b></p>:

                                    <p className="text-neutral-50">No tienes cuenta? <b className="text-red-800 underline hover:text-neutral-50 cursor-pointer" onClick={()=> setRegister(true)}>Registrate</b></p>
                            }

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

