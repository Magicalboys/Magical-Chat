import React , { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter}  from 'react-router-dom'
import './index.css';
import App from './App';
import { loader } from '@/assets/picture/loader.gif';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback = {<loader/>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

