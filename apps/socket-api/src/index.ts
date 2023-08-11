import express from "express";
import http from 'http';
import { Server, Socket } from "socket.io";
import cors from 'cors';
import mongoose from "mongoose";


const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const port = 5173;

interface IBoard {
    _id: mongoose.Types.ObjectId;
    src: string,
    pos: string,
    color: "white" | "black" | ".",
    type: "king" | "queen" | "rook" | "bishop" | "pawn" | "horse" | ".",
}


let cnt = 1;
let storedRoom = "";
io.on('connection', (socket: Socket) => {
    console.log("A user Connected", socket.id);

    socket.on('piece-moved', async (arr: IBoard[], room: string) => {
        console.log(`piece-moved inside room: ${room}`, socket.id);
        socket.to(room).emit("receive-newBoard", JSON.stringify(arr)); 
    })


    socket.on('join-room', (room: string, cb: (message: string, cnt: number) => void) => {
        socket.join(room);
        if(room == storedRoom){
            cb("Another one joined", cnt);
            cnt++;
        }
        else{
            cnt = 1;
            cb("first person joined", cnt);
            storedRoom = room;
            cnt++;
        }
        console.log(`joined-room ${room}`, socket.id);
    })
})

httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})