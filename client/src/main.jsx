import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth.context'

createRoot(document.getElementById('root')).render(
    <App />
)
