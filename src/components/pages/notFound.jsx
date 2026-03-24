import {Link} from "react-router";
import Menu from "../ui/menu.jsx";
const NotFound = ({usersGet}) => {
    return(
        <>
            <Menu usersGet={usersGet} />
            <div className="not-found container">
                <h2 className="mt-4">ERROR 404 PAGINA NO ENCONTRADA</h2>
                <Link to="/" className="link-primary "> vuelve a la pagina inicial</Link>
            </div>
        </>
    )
}

export default NotFound