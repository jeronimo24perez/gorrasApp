import Menu from "../ui/menu.jsx";
import CardGrid from "../features/cardGrid.jsx";
import Footer from "../ui/footer.jsx";

const Marcas = ({data, usersGet})=>{
    return(
        <>
            <Menu usersGet={usersGet} />
            <CardGrid data={data} size="6" />
            <Footer />
        </>
    )
}

export default Marcas