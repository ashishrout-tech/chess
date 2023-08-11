"use client"

import { Socket, io } from "socket.io-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@overpowered-monorepo/ui/lib/utils";
import { IBoard } from "../../../interface";
import { CHECK, cell } from "../../../utils/check-game";
import { changeBoard } from "../../../utils/change-board";


const Game = () => {
    const [arr, setArr] = useState<IBoard[]>([]);
    const [fakeArr, setFakeArr] = useState<IBoard[]>([]);
    const [lastEle, setLastEle] = useState<IBoard>();
    const [socket, SetSocket] = useState<Socket | null>(null);
    const [roomValue, setRoomValue] = useState<string | null>(null);
    const [cnt, setCnt] = useState<number>(1);

    useEffect(() => {
        const newSocket = io('ws://localhost:5173');
        SetSocket(newSocket);
        newSocket.on("connect", () => {
            const newRoomValue = prompt("Enter the room you want to join");

            newSocket.emit("join-room", newRoomValue, (message: string, cnt: number) => {
                console.log(message, cnt);
                setRoomValue(newRoomValue);
                setCnt(cnt);
            })

        })

        return () => {
            newSocket.disconnect();
        };
    }, [])

    useEffect(() => {
        async function fetchBoard() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/board`);
                setArr(response.data.message);
                setFakeArr(response.data.message);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBoard();
    }, [])

    ///////
    if(socket){
        socket.on("receive-newBoard", (arr: string) => {
            const newArr = JSON.parse(arr);
            // console.dir(newArr);
            // changeBoard(newArr);
            setArr(newArr);
        })
    }
    ///////

    function drag(ele: IBoard) {
        console.log("dragging", ele.pos);
    }
    function dragEnter(ele: IBoard) {
        setLastEle(ele);
    }
    function DragEnd(startEle: IBoard) {

        
        if (startEle.color === lastEle.color) {
            return;
        }
        
        const isValid = CHECK(startEle, lastEle, arr, cnt);
        if (!isValid) return;
        
        console.log(startEle.pos);
        console.log(lastEle.pos);
        console.log(arr);
        
        const newArr = arr.map((ele) => {
            if (ele.pos === startEle.pos) {
                let SRC = lastEle.src;
                let TYPE = lastEle.type;
                let COLOR = lastEle.color;
                if (lastEle.src !== ".") {
                    SRC = ".",
                    COLOR = ".",
                    TYPE = "."
                }
                // // if(lastSrc[0].src === ele.src) SRC = ele.src
                return { ...ele, src: SRC, type: TYPE, color: COLOR };
            }
            if (ele.pos === lastEle.pos) {
                return { ...ele, src: startEle.src, type: startEle.type, color: startEle.color };
            }
            return { ...ele };
        })

        let newFakeArr = [];
        for (let r = 1; r <= 8; r++) {
            for (let c = 1; c <= 8; c++) {
                let clr = newArr[cell(9 - r, c)].color;
                newFakeArr.push({ ...newArr[cell(9 - r, c)], pos: `${r}-${c}`});
            }
        }
        setFakeArr(newFakeArr);
        
        // console.dir(newArr);
        if (socket) {
            socket.emit('piece-moved', newFakeArr, roomValue);
        }
        setArr(newArr);
    }

    return (
        <div className="flex justify-center items-center">
            <Image placeholder='empty' priority={false} className=" mt-10 z-0 absolute" width={384} height={384} src={"/board.jpeg"} alt="board" unoptimized={true} />
            <div className=" z-10 bg-cover bg-no-repeat bg-center flex mt-10 h-96 w-96 flex-wrap ">
                {
                    arr.map(ele => {
                        if (ele.src == ".") {
                            return <div key={ele.pos} draggable={false} onDragEnter={() => dragEnter(ele)} className=" box-border w-12 h-12">

                            </div>
                        }
                        return <div key={ele.pos} onDragEnd={() => DragEnd(ele)} onDragEnter={() => dragEnter(ele)} onDrag={() => drag(ele)} draggable={true} className=" box-border w-12 h-12 flex justify-center items-center">
                            <Image draggable={false} width="30" height="30" src={ele.src} alt="chess" />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Game;