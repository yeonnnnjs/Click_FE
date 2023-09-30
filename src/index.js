import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App/App';
import Click from './Click/click';
import Rank from './Rank/rank';
import Changelog from './Changelog/changelog';
import Roomlist from './Roomlist/roomlist';
import MakeRoom from './Makeroom/Makeroom';
import WaitRoom from './Waitroom/Waitroom';
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
        <Route path='/roomlist' Component={Roomlist} />
        <Route path='/makeroom' Component={MakeRoom} />
        <Route path='/waitroom' Component={WaitRoom} />
      </Routes>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
