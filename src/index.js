/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App/App';
import Click from './Click/click';
import Rank from './Rank/rank';
import Changelog from './Changelog/changelog';
import Game from './Game/game';
import Room from './Room/room'
import Result from './Result/result'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route exact id='root' path='/' Component={App} />
        <Route exact path='/click' Component={Click} />
        <Route exact path='/rank' Component={Rank} />
        <Route exact path='/changelog' Component={Changelog} />
        <Route exact path='/game' Component={Game} />
        <Route exact path='/room' Component={Room} />
        <Route exact path='/result' Component={Result} />
      </Routes>
    </Router>
);
reportWebVitals();
