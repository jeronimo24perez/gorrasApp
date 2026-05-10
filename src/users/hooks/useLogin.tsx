import Swal from "sweetalert2";
import type { LoginForm } from "../models/user.tsx";
import { useNavigate } from "react-router";
import {useContext} from "react";
import {LoginContext} from "../context/loginContext.tsx";

interface HookProps extends LoginForm {
    register: boolean;
}

export default function useLogin({ username, email, password, register }: HookProps) {
    const navigate = useNavigate()
    const context = useContext(LoginContext)

    async function submit() {
        const emailValid = email.includes("@") && email.includes(".") && email.trim().length > 7
        const passwordValid = password.trim().length > 3
        const nameValid = username.trim().length > 3

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

            const res = await fetch("https://gorras-backend-django-1ui3.vercel.app/users/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password})
            })
            console.log(res.status)
            if (res.status !== 201) {
                Swal.fire({
                    title: "Error",
                    text: "El usuario ya existe.",
                    icon: "error",
                    background: "#292524",
                    confirmButtonColor: "#C10007",
                    color: "#fff"
                })
                return
            }
            const data = await res.json()
            const token = data.token


            const profile = await fetch("https://gorras-backend-django-1ui3.vercel.app/profile/", {
                method: "GET",
                headers: { "Authorization": `Token ${token}` }
            })
            const profileData = await profile.json()
            if(profile.status !== 200 ) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al crear el usuario.",
                    icon: "error",
                    background: "#292524",
                    confirmButtonColor: "#C10007",
                    color: "#fff"
                })
                return;
            }

            const cartSession = await fetch("https://gorras-backend-django-1ui3.vercel.app/cart/cart_session/", {
                method: "POST",
                headers: { "Content-Type": "application/json" , "Authorization": `Token ${token}` },
                body: JSON.stringify({
                    user: await profileData.message.id,
                })
            })
            const cartData = await cartSession.json()
            localStorage.setItem("cartUser", cartData.id)
            if(cartSession.status !== 201) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al crear el usuario.",
                    icon: "error",
                    background: "#292524",
                    confirmButtonColor: "#C10007",
                    color: "#fff"
                })
                return;
            }
            localStorage.setItem("auth", "true")
            localStorage.setItem("Authorization", `Token ${token}`)
            localStorage.setItem("id", JSON.stringify(profileData.message.id))
            context?.setLogged(true)
            Swal.fire({
                title: "Usuario registrado",
                text: "Bienvenido a Caps Store",
                icon: "success",
                background: "#292524",
                confirmButtonColor: "#00C950",
                color: "#fff"
            })
            navigate(-1)

        }
        else {
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

                const res = await fetch(`https://gorras-backend-django-1ui3.vercel.app/login/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                })
                if(res.status !== 200){
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
                const data = await res.json()
                localStorage.setItem("Authorization", `Token ${data.token}`)
            const profile = await fetch("https://gorras-backend-django-1ui3.vercel.app/profile/", {
                method: "GET",
                headers: { "Authorization": `Token ${data.token}` }
            })
            const profileData = await profile.json()
               localStorage.setItem("id", JSON.stringify(profileData.message.id))

                context?.setLogged(true)
                Swal.fire({
                    title: "Bienvenido de nuevo",
                    text: "Caps Store",
                    icon: "success",
                    background: "#292524",
                    confirmButtonColor: "#00C950",
                    color: "#fff"
                })
                const cartSession = await fetch("https://gorras-backend-django-1ui3.vercel.app/cart/cart_session/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" , "Authorization": `Token ${data.token}` },
                    body: JSON.stringify({
                        user: await profileData.message.id,
                    })
                })
                const cartData = await cartSession.json()
                localStorage.setItem("cartUser", cartData.id)
                navigate(-1)

            }
    }

    return { submit }
}