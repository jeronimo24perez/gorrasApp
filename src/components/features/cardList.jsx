import {useState} from "react";

const CardList =({img, price, name, id})=>{
    const [cantidad, setCantidad] = useState(1)

    return (
        <>
            <div className="card mb-3 me-2 ms-2 mt-3 shadow-sm border-2 border-warning" id={id} data-bs-theme="dark">
                <div className="row g-0 align-items-center">
                    <div className="col-3 col-md-2">
                        <img
                            src={img}
                            className="img-fluid rounded-start p-2"
                            alt="Producto"
                        />
                    </div>
                    <div className="col-9 col-md-10">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title mb-1">{name}</h5>

                            </div>

                            <div className="text-end">
                                <span className="fw-bold d-block mb-2">{price}</span>
                                <div className="btn-group btn-group-sm" role="group">
                                    <button className="btn btn-outline-secondary cantidad-resta" onClick={()=>{
                                        if(cantidad <= 1){
                                            setCantidad(0)
                                        }else{
                                            setCantidad(prev => prev - 1)
                                        }
                                    }}>-</button>
                                    <span className="px-3 align-self-center">{cantidad}</span>
                                    <button className="btn btn-outline-secondary cantidad-suma" onClick={()=>{

                                        setCantidad(prev => prev + 1)
                                    }}>+</button>
                                </div>
                                <button className="btn btn-link link-danger  btn-sm d-block mt-2 p-0" onClick={()=>{
                                    console.log(localStorage.getItem('user'), id)
                                    fetch(`https://backend-gorras-app.vercel.app/cart/${id}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Accept': 'application/json',
                                            'content-type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            userId: localStorage.getItem('user')
                                        })
                                    }).then(res => res.json())
                                            setInterval(()=>{
                                                location.reload();
                                            },600)
                                }}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardList