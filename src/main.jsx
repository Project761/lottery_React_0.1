import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx';
import { FormDataProvider } from './context/FormDataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormDataProvider>
      <App />
    </FormDataProvider>
  </StrictMode>,
)
