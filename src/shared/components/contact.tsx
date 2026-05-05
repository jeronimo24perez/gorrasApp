import Navbar from "./navbar.tsx";
import Footer from "./footer.tsx";
import {type ChangeEvent, type MouseEvent, useState} from "react";
import Swal from 'sweetalert2'

interface form {
    name: string,
    email: string,
    message: string,
}

const Contact = () => {
    const [form, setForm] = useState<form>({
        name: "",
        email: "",
        message: "",
    })
    const webhook = 'https://sys3-bot.aramiib.com/webhook/bf96e04a-dbd7-468e-9d4b-e60617d3a1ec'
    //=> setForm({...form, name: e.target.value})
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({...form, [e.target.id]: e.target.value})
    }
    function handleSubmit(e: MouseEvent<HTMLButtonElement> ){
        e.preventDefault()
        const nameValid = form.name.trim().length > 3
        const emailValid = form.email.includes("@") && form.email.includes(".") && form.email.trim().length > 7
        const messageValid = form.message.trim().length > 3

        const formValid = nameValid && emailValid && messageValid
        if(!formValid) {
            Swal.fire({
                title: "Error",
                text: "Por favor completa todos los campos correctamente.",
                icon: "error",
                background: "#292524",
                confirmButtonColor: "#C10007",
                color: "#fff"
            }
        )
            return;
        }
         fetch(webhook, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `Hola soy ${form.name} con el correo  (${form.email}) digo: ${form.message}`
            })
        }).then(()=> Swal.fire({
            title:"Mensaje enviado",
            text: "Gracias por contactarnos, pronto nos pondremos en contacto contigo.",
            icon: "success",
            background: "#292524",
            confirmButtonColor: "#00C950",
            color: "#fff"
        }) )
    }
    return(
        <>
            <Navbar />
            <div className="flex bg-neutral-950 justify-center items-center p-8">
                <form className="bg-stone-800 rounded-2xl  w-full max-w-md">
                    <h2 className="text-center text-2xl font-bold text-white mb-6">
                        Contáctanos
                    </h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Juan Pérez" id="name" value={form.name} onChange={handleChange}
                            className="backdrop-blur-md opacity-60 rounded-full rounded-lgtext-white placeholder-gray-500 text-neutral-50 outline-none border-1 focus:border-red-500 transition"
                        />
                        <input
                            id="email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            value={form.email} onChange={handleChange}
                            className="backdrop-blur-md opacity-60 rounded-full rounded-lgtext-white  text-white outline-none border-1 focus:border-red-500 transition"
                        />
                        <textarea
                            id="message"
                            placeholder="¿En qué podemos ayudarte?"
                            rows={5}
                            value={form.message} onChange={handleChange}
                            className="backdrop-blur-md opacity-60 rounded-xl rounded-lgtext-white placeholder-gray-500 text-neutral-50 outline-none border-1 focus:border-red-500 transition resize-none"
                        />
                        <button onClick={handleSubmit} className="bg-red-700 cursor-pointer hover:bg-red-800 text-white font-semibold  rounded-lg transition">
                            Enviar Mensaje
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Contact