import {Link} from "react-router";

const Footer = ()=>{
    return (
        <>
            <footer className="bg-dark py-5 mt-5 border-top" data-bs-theme="dark" >
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 mb-4">
                            <h5 className="fw-bold">Tienda de Gorras</h5>
                            <p className="text-muted">
                                La mejor calidad en gorras urbanas y deportivas. Envíos a todo el país.
                            </p>
                        </div>

                        {/* Sección 2: Enlaces rápidos */}
                        <div className="col-6 col-md-4 mb-4">
                            <h6 className="fw-bold">Enlaces</h6>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <Link to='/' onClick={()=>{window.scroll(0,0)} }  className="nav-link p-0 text-muted">Inicio</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to='/marcas' onClick={()=>{window.scroll(0,0)} } className="nav-link p-0 text-muted">Marcas</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/contacto" onClick={()=>{window.scroll(0,0)}} className="nav-link p-0 text-muted">Contacto</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Sección 3: Redes Sociales / Newsletter */}
                        <div className="col-6 col-md-4 mb-4">
                            <h6 className="fw-bold">Síguenos</h6>
                            <div className="d-flex">
                                {/* Usamos utilidades de Flex para alinear iconos */}
                                <a href="#" className="btn btn-outline-primary me-2">Facebook</a>
                                <a href="#" className="btn btn-outline-danger">Instagram</a>
                            </div>
                        </div>
                    </div>

                    {/* Línea final de Copyright */}
                    <div className="d-flex flex-column text-light flex-sm-row justify-content-between py-4 my-4 border-top">
                        <p>© 2026 Tienda de Gorras, Inc. Todos los derechos reservados.</p>
                        <p>Pagina creada por Jeronimo Perez, usando Bootstrap y React para el frontend, nodeJS y Mongo para el backend.</p>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer