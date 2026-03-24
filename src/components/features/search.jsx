const Search = () => {
    return (
    <div className="offcanvas offcanvas-top"  data-bs-theme="dark" tabIndex="-1" id="offcanvasSearch" aria-labelledby="offcanvasSearchLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasSearchLabel">Buscar en el sitio</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <div className="container">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="¿Qué estás buscando?"
                        aria-label="Buscar"
                    />
                    <button className="btn bg-custom text-dark" type="button">Buscar</button>
                </div>
            </div>
        </div>

    </div>
    )
}

export default Search