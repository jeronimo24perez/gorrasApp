
import './App.css'
import {Route, Routes, useLocation} from "react-router";
import CapsPage from "./caps/pages/capsPage.tsx";
import CapProduct from "./caps/pages/capProduct.tsx";
import BrandPage from "./caps/pages/brandPage.tsx";
import BrandDetail from "./caps/pages/brandDetail.tsx";
import Contact from "./shared/components/contact.tsx";
import { LoginFormComponent} from "./users/components/loginForm.tsx";
import Cart from "./car/pages/cart.tsx";

function App() {
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation;
  return (
    <>
        <Routes location={backgroundLocation || location} >
          <Route path="/" element={<CapsPage />} />
          <Route path="/cap/:id" element={<CapProduct /> } />
          <Route path={'/marcas'} element={<BrandPage />} />
          <Route path={'/marca/:id'} element={<BrandDetail />} />
          <Route path={'/contacto'} element={<Contact />} />
          <Route path={'/carrito'} element={<Cart />} />
        </Routes>
      {backgroundLocation &&
        <Routes>
          <Route path="/login" element={<LoginFormComponent />} />
        </Routes>
      }
    </>
  )
}

export default App
