import { createContext } from 'react';
import socketio from "socket.io-client";

const address = process.env.REACT_APP_SOCKET_URL;

export const socket = socketio.connect('http://' + address + ':8100');
export const SocketContext = createContext();