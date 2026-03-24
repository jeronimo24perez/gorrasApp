import Menu from "../ui/menu.jsx";
import CardGrid from "../features/cardGrid.jsx";
import Banner from "../ui/banner.jsx";
import Footer from "../ui/footer.jsx";

const Home = ({data, usersGet}) => {
    return (
        <>
            <Menu usersGet={usersGet}/>
            <Banner />
            <CardGrid data={data} page="home" theme="dark" size="3" />
            <Footer />
        </>
    )
}

export default Home