import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import About from './Pages/About.tsx'
import Footer from './Components/Footer.tsx'
import BusinessPage from './Pages/BusinessPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
