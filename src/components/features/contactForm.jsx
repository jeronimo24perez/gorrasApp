
const ContactForm = () => {
    return (
        <div className="container mt-5">

            <div className="row justify-content-center" >
                <div className="col-md-6">
                    <div className="card shadow bg-dark p-4">
                        <h2 className="text-center text-light mb-4">Contáctanos</h2>
                        <form >
                            <div className="mb-3">
                                <label className="form-label">Nombre Completo</label>
                                <input type="text" className="form-control" placeholder="Juan Pérez" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Correo Electrónico</label>
                                <input type="email" className="form-control" placeholder="nombre@ejemplo.com" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mensaje</label>
                                <textarea className="form-control bg-light-subtle" rows="4" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>


                            <div className="d-grid">
                                <button type="submit" className="btn bg-custom border-light text-dark">Enviar Mensaje</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm;