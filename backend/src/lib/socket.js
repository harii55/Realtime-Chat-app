import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMaps[userId]; // Retrieve the socket ID for the given userId
}


//{userId: socket.id} MAP
const userSocketMaps = { };    


//Main event for socket connection
io.on("connection", (socket) => {
  
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId; // Get userId from the query params

    if(userId) userSocketMaps[userId] = socket.id; // Store the socket ID in the map
    
    //io.emit() is used to emit an event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMaps)); 


    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMaps[userId]; // Remove the socket ID from the map
        io.emit("getOnlineUsers", Object.keys(userSocketMaps)); // Emit the updated list of online users
  });

});
export {io,app, server};