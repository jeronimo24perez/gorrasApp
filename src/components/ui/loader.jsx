const Loader = ()=>{
    return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>

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