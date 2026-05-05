import Swal from "sweetalert2";
import type { LoginForm } from "../models/user.tsx";
import { useNavigate } from "react-router";

interface HookProps extends LoginForm {
    register: boolean;
}

export default function useLogin({ name, email, password, register }: HookProps) {
    const navigate = useNavigate()

    async function submit() {
        const emailValid = email.includes("@") && email.includes(".") && email.trim().length > 7
        const passwordValid = password.trim().length > 3
        const nameValid = name.trim().length > 3

        if (register) {
            if (!emailValid || !passwordValid || !nameValid) {
                Swal.fire({
                    title: "Error",
                    text: "Por favor completa todos los campos correctamente.",
                    icon: "error",
                    background: "#292524",
                    confirmButtonColor: "#C10007",
                    color: "#fff"
                })
                return
            }

            const res = await fetch("https://backend-gorras-app.vercel.app/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, user_type: "client" })
            })
            const data = await res.json()
            localStorage.setItem("id", data._id)
            localStorage.setItem("auth", "true")

            Swal.fire({
                title: "Usuario registrado",
                text: "Bienvenido a Caps Store",
                icon: "success",
                background: "#292524",
                confirmButtonColor: "#00C950",
                color: "#fff"
            })
            navigate(-1)

        } else {
            if (!emailValid || !passwordValid) {
                Swal.fire({
                    title: "Error",
                    text: "Por favor completa todos los campos correctamente.",
                    icon: "error",
                    background: "#292524",
                    confirmButtonColor: "#C10007",
                    color: "#fff"
                })
                return
            }

            try {
                const res = await fetch(`https://backend-gorras-app.vercel.app/users/login/${email}`)
                const data = await res.json()

                if (data.password !== password) {
                    Swal.fire({
                        title: "Error",
                        text: "Contraseña/email incorrectos, por favor intenta nuevamente.",
                        icon: "error",
                        background: "#292524",
                        confirmButtonColor: "#C10007",
                        color: "#fff"
                    })
                    return
                }

                localStorage.setItem("auth", "true")
                localStorage.setItem("id", data._id)
                Swal.fire({
                    title: "Bienvenido de nuevo",
                    text: "Caps Store",
                    icon: "success",
                    background: "#292524",
                    confirmButtonColor: "#00C950",
                    color: "#fff"
                })
                navigate(-1)

            } catch {
                Swal.fire({
                    title: "Error",
                    text: "Contraseña/email incorrectos, por favor intenta nuevamente.",
                    icon: "error",
                    background: "#292524",
                    confirmButtonColor: "#C10007",
                    color: "#fff"
                })
            }
        }
    }

    return { submit } // ✅ retorna la función
}