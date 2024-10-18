import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './componenter/App'
import './styling/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
