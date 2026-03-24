const Loader = ()=>{
    return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        {/* Aumentamos el tamaño usando estilos de ancho y alto, ya que Bootstrap solo provee la clase '.spinner-border-sm' para hacerlo más pequeño */}
        <div
            className="spinner-border text-primary"
            style={{ width: '5rem', height: '5rem' }}
            role="status"
        >
            <span className="visually-hidden">Cargando...</span>
        </div>
    </div>
}

export default Loader;