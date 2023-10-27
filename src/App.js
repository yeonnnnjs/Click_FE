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
        <Route exact id='root' path='/' Component={Main} />
        <Route exact path='/click' Component={Click} />
        <Route exact path='/rank' Component={Rank} />
        <Route exact path='/changelog' Component={Changelog} />
        <Route exact path='/game' Component={Game} />
        <Route exact path='/room' Component={Room} />
        <Route exact path='/result' Component={Result} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
