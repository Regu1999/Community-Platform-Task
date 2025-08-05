import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router"

import store from './store/index.js';
import { queryClient } from "./http.js";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
