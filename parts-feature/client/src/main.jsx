import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PartsProvider } from './context/PartsContext'
import { ToastProvider } from './context/ToastContext'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <PartsProvider>
        <App />
      </PartsProvider>
    </ToastProvider>
  </React.StrictMode>
)