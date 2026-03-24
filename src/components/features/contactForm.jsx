import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
const ContactForm = () => {
    const form = useRef();
    const [success, setSuccess] = useState(false);
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_9bg0dqf', 'template_pyfbnqh', form.current, {
                publicKey: 'l0iEsa1cXzR6l9CUj',
            })
            .then(
                () => {
                    setSuccess(true);
                },
                (error) => {
                    setSuccess(error)
                },
            );
    };
    return (
        <div className="container mt-5">

            <div className="row justify-content-center" >
                <div className="col-md-6">
                    <div className="card shadow bg-dark p-4">
                        <h2 className="text-center text-light mb-4">Contáctanos</h2>
                        <form  ref={form} onSubmit={sendEmail} >
                            <div className="mb-3">
                                <label className="form-label">Nombre Completo</label>
                                <input type="text" name="name" className="form-control" placeholder="Juan Pérez" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Correo Electrónico</label>
                                <input type="email" name="email" className="form-control" placeholder="nombre@ejemplo.com" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mensaje</label>
                                <textarea className="form-control bg-light-subtle" name="message" rows="4" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>


                            <div className="d-grid">
                                <button type="submit" className="btn bg-custom border-light text-dark">Enviar Mensaje</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {success? <> <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 1050 }}>
                <div className="alert alert-success shadow-lg d-flex align-items-center p-4" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill me-3" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <div>
                        ¡Email enviado con éxito!
                    </div>
                </div>
            </div> </>: <></>}
        </div>
    )
}

export default ContactForm;