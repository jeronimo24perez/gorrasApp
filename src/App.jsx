import './App.css'
import {useEffect, useState} from "react";
import Home from "./components/pages/home.jsx";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from "react-router";
import NotFound from "./components/pages/notFound.jsx";
import Marcas from "./components/pages/marcas.jsx";
import Product from "./components/pages/product.jsx";
import MarcaSession from "./components/pages/marcaSession.jsx";
import Contact from "./components/pages/contact.jsx";
import Cart from "./components/pages/cart.jsx";
import Loader from "./components/ui/loader.jsx";

function App() {
    const [data, setData] = useState(null)
    const [state, setState] = useState(null)
    async function db(){
        const res =  await fetch("https://backend-gorras-app.vercel.app/");
        const users = await fetch("https://backend-gorras-app.vercel.app/users");
        const marcas = await fetch("https://backend-gorras-app.vercel.app/marcas");
        return {info: await res.json(), users: await  users.json(), marcas: await  marcas.json()}
    }
    useEffect(() => {
        db().then(res => {
            setData(res)
            setState(true)
        })
    }, []);
  return (
      state?
      <>
          <BrowserRouter>
              <Routes >
                  <Route path='/' element={<Home data={data.info} usersGet={data.users} />} />
                  <Route path='/marcas' element={<Marcas data={data.marcas} usersGet={data.users} />} />
                  <Route path='/compras' element={<Cart usersGet={data.users} info={data.info} />} />
                  <Route path='/product/:id' element={<Product usersGet={data.users}/> } />
                  <Route path='/marca/:id' element={<MarcaSession usersGet={data.users} />} />

                  <Route path={'/contacto'} element={<Contact usersGet={data.users}/> } />
                  <Route path="*" element={<NotFound usersGet={data.users} />} />
              </Routes>
          </BrowserRouter>

      </> :
         <Loader />
  )
}

export default App
