import { io, Socket } from "socket.io-client";

const SOCKET_URL = 'https://learnhive.vercel.app/'
console.log("SOCKET_URL from socket.ts: ", SOCKET_URL);

const socket: Socket = io(SOCKET_URL, {
  withCredentials: true,
});

export default socket;