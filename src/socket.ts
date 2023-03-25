import io, { Socket } from "socket.io-client";

let socket: Socket;

const connectSocket = (user_id: string) => {
  socket = io("http://localhost:3001", {
    query: `user_id=${user_id}` as any,
  });
};

export { socket, connectSocket };
