
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/App.Context.jsx'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
  
      <BrowserRouter>
      <AppContextProvider>
        <App />
        </AppContextProvider>
      </BrowserRouter>
    
  );
}
