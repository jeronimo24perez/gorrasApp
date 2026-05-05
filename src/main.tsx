import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import CartProvider from "./car/context/cartProvider.tsx";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <CartProvider>
              <App />
          </CartProvider>
      </BrowserRouter>
  </StrictMode>,
)
