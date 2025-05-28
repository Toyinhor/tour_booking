import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './MainLayout/MainLayout.jsx'
import MainLayout from "./MainLayout/MainLayout.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainLayout/>
  </StrictMode>,
)
