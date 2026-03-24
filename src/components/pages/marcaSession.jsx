import Menu from "../ui/menu.jsx";
import Footer from "../ui/footer.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import CardGrid from "../features/cardGrid.jsx";
import Loader from "../ui/loader.jsx";

const MarcaSession = ({usersGet})=>{
    const [marca, setMarca] = useState();
    const [cap, setCap] = useState();
    const [state, setState] = useState(null);
    const {id} = useParams()

    async function  fetching(){
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const data = await fetch(`https://backend-gorras-app.vercel.app/marcas/${id}`);
        const getter = await  fetch(`https://backend-gorras-app.vercel.app/`);
        return {data: await data.json(), caps: await getter.json()};
    }
    useEffect(()=>{
        fetching().then(res => {
            setMarca(res.data.marca);
            setCap(res.caps);
            setState(true);
        })
    }, [])
    let array = [];
    let confirmation = 0;

    return(
        state?
        <>
            <Menu usersGet={usersGet} />
            <div>
                {cap.map(e =>{
                        if(e.marca === marca){
                            array.push(e)
                            confirmation+=1;
                        }

                    }

                ) }
                {confirmation === 0? <h2 className="container mt-5 text-center"> Los productos de esta marca estan agotados</h2>: null}
                <CardGrid data={array} page="home" theme="dark" size="4" />
            </div>
            <Footer />
        </>
            :
        <Loader />
    )
}

export default MarcaSession;