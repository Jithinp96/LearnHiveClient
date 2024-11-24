import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
console.log("SOCKET_URL from socket.ts: ", SOCKET_URL);

const socket: Socket = io(SOCKET_URL, {
  withCredentials: true,
});

export default socket;