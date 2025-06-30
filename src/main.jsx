import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../fontawesome-free-6.7.2-web/css/all.min.css";
import './index.css';
import { RecoilRoot } from 'recoil';
import { HashRouter } from 'react-router-dom';
// ==================================================== //
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <App />
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>,
)