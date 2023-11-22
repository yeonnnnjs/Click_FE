/* eslint-disable */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SocketContext, socket } from './Context/socketContext';
import Main from './Main/main';
import Click from './Click/click';
import Rank from './Rank/rank';
import Changelog from './Changelog/changelog';
import Game from './Game/game';
import Room from './Room/room'
import Result from './Result/result'

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path='/' Component={Main} />
        <Route path='/click' Component={Click} />
        <Route path='/rank' Component={Rank} />
        <Route path='/changelog' Component={Changelog} />
        <Route path='/game' Component={Game} />
        <Route path='/room' Component={Room} />
        <Route path='/result' Component={Result} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
