"use client"

import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IBoard } from "../../../interface";
import After from "./after";
import DragEnds from "./drag-end";
import { cell } from "../../../utils/check-game";
import { type } from "os";

let startCell: IBoard | null = null;
let endCell: IBoard | null = null;

const Game = () => {
    const [arr, setArr] = useState<IBoard[]>([]);
    // const [fakeArr, setFakeArr] = useState<IBoard[]>([]);
    const [lastEle, setLastEle] = useState<IBoard>();
    const [socket, SetSocket] = useState<Socket | null>(null);
    const [roomValue, setRoomValue] = useState<string | null>(null);
    const [cnt, setCnt] = useState<number>(1);
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(true);

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
                // setFakeArr(response.data.message);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBoard();
    }, [])

    ///////
    if (socket) {
        socket.on("receive-newBoard", (arr: string) => {
            const newArr = JSON.parse(arr);
            // console.dir(newArr);
            setArr(newArr);
            setFlag2(true);
            setFlag3(false);
        })
    }
    ///////

    if (cnt === 2 && flag) {
        let newFakeArr = [];
        for (let r = 1; r <= 8; r++) {
            for (let c = 1; c <= 8; c++) {
                newFakeArr.push({ ...arr[cell(9 - r, c)], pos: `${r}-${c}` });
            }
        }
        setArr(newFakeArr);
        setFlag(false);
    }

    function drag(ele: IBoard) {
        console.log("dragging", ele.pos);
    }
    function dragEnter(ele: IBoard) {
        setLastEle(ele);
    }

    function DragEnd(startEle: IBoard) {
        DragEnds(socket, startEle, lastEle, arr, cnt, setArr, flag2, flag3, roomValue, setFlag2, setFlag3);
    }




    let storeElement: HTMLDivElement | HTMLElement;

    function TouchStart(ele: IBoard, e: React.TouchEvent) {
        let childElement = e.target as HTMLDivElement;
        if (!startCell) {
            if (ele.type === ".") return;
            startCell = ele;
            // console.dir(e);
            // console.dir(childElement)
            if(childElement.nodeName === "IMG"){
                childElement.parentElement.classList.add("bg-red-700/20", "border-2", "border-red-800/80");
                storeElement = childElement.parentElement;
                return;
            }
            childElement.classList.add("bg-red-700/20", "border-2", "border-red-800/80");
            storeElement = childElement;
        }
        else {
            if (ele.pos != startCell.pos) {
                endCell = ele;
                console.log(startCell.pos, endCell.pos);
                DragEnds(socket, startCell, endCell, arr, cnt, setArr, flag2, flag3, roomValue, setFlag2, setFlag3);
                startCell = null;
                // console.dir(storeElement)
                storeElement.classList.remove("bg-red-700/20", "border-2", "border-red-800/80")
            }
        }
    }




    return (
        <>
            <After arr={arr} drag={drag} dragEnter={dragEnter} DragEnd={DragEnd} TouchStart={TouchStart}></After>
        </>
    )
}

export default Game;