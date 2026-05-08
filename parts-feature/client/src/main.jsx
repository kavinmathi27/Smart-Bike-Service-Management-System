import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PartsProvider } from './context/PartsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PartsProvider>
      <App />
    </PartsProvider>
  </React.StrictMode>
)