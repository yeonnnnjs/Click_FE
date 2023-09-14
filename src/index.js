import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Click from './click';
import Rank from './rank';
import Changelog from './changelog';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact id='root' path='/' Component={App} />
        <Route exact path='/click' Component={Click} />
        <Route path='/rank' Component={Rank} />
        <Route path='/changelog' Component={Changelog} />
      </Routes>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
