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
import GameRoom from './Game/game';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact id='root' path='/' Component={App} />
        <Route exact path='/click' Component={Click} />
        <Route exact path='/rank' Component={Rank} />
        <Route exact path='/changelog' Component={Changelog} />
        <Route exact path='/roomlist' Component={Roomlist} />
        <Route exact path='/makeroom' Component={MakeRoom} />
        <Route exact path='/waitroom' Component={WaitRoom} />
        <Route exact path='/game' Component={GameRoom} />
      </Routes>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
