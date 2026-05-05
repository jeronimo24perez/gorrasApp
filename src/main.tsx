import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import CartProvider from "./car/context/cartProvider.tsx";
import LoginProvider from "./users/context/loginProvider.tsx";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <LoginProvider>
              <CartProvider>
                  <App />
              </CartProvider>
          </LoginProvider>
      </BrowserRouter>
  </StrictMode>,
)
