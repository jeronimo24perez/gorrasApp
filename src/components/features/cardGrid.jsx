import Card from "../ui/card.jsx";

const CardGrid = ({ data, page, theme, size, marca})=>{
    return(
        <>
            <main className="container-fluid my-5">
                <div className="row ">
                    {data.map(i => <Card img={i.img} price={i.price} title={i.name} page={page} theme={theme} marca={marca} size={size} key={i._id} id={i._id} /> )}
                </div>
            </main>
        </>
    )
}

export default CardGrid;