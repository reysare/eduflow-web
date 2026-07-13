import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/index.css'
import App from './components/app.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
