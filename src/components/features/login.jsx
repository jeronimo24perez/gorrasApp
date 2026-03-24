import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


// Dentro de tu componente:
const Login = ({usersGet})=>{
    const [showPassword, setShowPassword] = useState(false);
    const [formType, setFormType] = useState('login');
    return(

        <>
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" data-bs-theme="dark">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {formType === 'login' ?
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Correo electrónico</label>
                                        <input type="email" autoComplete="email" name="email" className="form-control email" placeholder="nombre@ejemplo.com" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label d-flex">Contraseña</label>
                                        <input autoComplete="password" name="password" type={showPassword ? "text" : "password"} className="form-control password" />
                                        <button
                                            className="btn mt-3 btn-outline-secondary d-flex"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button> <p className="fail"></p>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn bg-custom fw-bold text-dark" onClick={ (e)=>{
                                            e.preventDefault()
                                            const email = document.querySelector('.email').value;
                                            const password = document.querySelector('.password').value;
                                            //compruebo email valido
                                            if(email.indexOf('@') !== -1 && email.indexOf('.') !== -1){
                                                let confirmation = 0;
                                                let user;
                                                usersGet.map(e => {
                                                    if(email === e.email && password === e.password){
                                                        confirmation = 1;
                                                        user = e;
                                                    }
                                                })
                                                if(confirmation === 1){
                                                    localStorage.setItem('login', 'true')
                                                    localStorage.setItem('user', `${user._id}`)
                                                    window.location.reload()
                                                }else if(confirmation === 0){
                                                    document.querySelector('.email').classList.add('is-invalid');
                                                    document.querySelector('.password').classList.add('is-invalid')
                                                    document.querySelector('.fail').innerHTML = 'Correo y/o contrasena invalidos'
                                                }

                                            }
                                            else{
                                                document.querySelector('.email').classList.add('is-invalid');
                                            }


                                        }}>Iniciar Sesion</button>
                                    </div>
                                    <p className='text-primary mt-3 text-decoration-underline link-info cursor-pointer' onClick={()=> setFormType('register')}>¿No tienes cuenta? Registrate</p>
                                </form>:
                                <>
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Nombre Completo</label>
                                            <input type="text" className="form-control create-username" placeholder="Juan Pérez" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Correo electrónico</label>
                                            <input type="email" autoComplete="email" name="email" className="form-control create-email" placeholder="nombre@ejemplo.com" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña</label>
                                            <input autoComplete="password" name="password"  type={showPassword ? "text" : "password"} className="form-control create-password" />
                                            <button
                                                className="btn mt-3 btn-outline-secondary d-flex"
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button><p className="fail-create"></p>
                                        </div>
                                        <div className="d-grid mb-3">
                                            <button type="submit" className="btn bg-custom text-dark fw-bold" onClick={(e)=>{
                                                e.preventDefault();
                                                const userName = document.querySelector('.create-username')
                                                const email = document.querySelector('.create-email')
                                                const password = document.querySelector('.create-password')

                                                let confirmation = 0;
                                                if(email.value.indexOf('@') !== -1 && email.value.indexOf('.') !== -1){
                                                    usersGet.map(e => {
                                                        if(email.value === e.email){
                                                            confirmation = 1;
                                                        }
                                                    })
                                                    if(confirmation === 1){
                                                        document.querySelector('.fail-create').innerHTML = 'esta cuenta ya existe'
                                                    }else if(confirmation === 0){
                                                        fetch('https://backend-gorras-app.vercel.app/users', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                            },
                                                            body: JSON.stringify({
                                                                name: userName.value,
                                                                email: email.value,
                                                                password: password.value,
                                                                car: [],
                                                                user_type: "client"
                                                            })
                                                        }).then(res=>res.json()).catch(err => console.log(err));
                                                        document.querySelector('.fail-create').innerHTML = 'cuenta creada, por favor inicie sesion';
                                                        window.location.reload()

                                                    }
                                                }else{
                                                    email.classList.add('is-invalid');
                                                }

                                            }}>Crear Cuenta</button>
                                        </div>
                                        <p className="text-center">
                                            ¿Ya tienes cuenta?{' '}
                                            <a href="#" className="text-primary cursor-pointer" onClick={() => setFormType('login')}>
                                                Inicia Sesión
                                            </a>
                                        </p>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login