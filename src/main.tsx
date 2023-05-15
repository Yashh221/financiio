import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import { Provider } from 'react-redux/es/exports'
import { configureStore } from '@reduxjs/toolkit/dist/configureStore'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './state/api'

export const store = configureStore({
  reducer:{[api.reducerPath]:api.reducer},
  middleware:(getDefault) => getDefault().concat(api.middleware),
})
setupListeners(store.dispatch)





ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
