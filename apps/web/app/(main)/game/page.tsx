"use client"

import { Socket, io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IBoard } from "../../../interface";
import After from "./after";
import DragEnds, { Hooks } from "./drag-end";
import { cell } from "../../../utils/check-game";
import { Timer } from "./Timer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { blackTimeState, whiteTimeState } from "../../../recoil/atom";
import { BlackIntervalId, WhiteIntervalId, changeBlackIntervalId, changeWhiteIntervalId } from "./variables";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

let startCell: IBoard | null = null;
let endCell: IBoard | null = null;

let parentFlag = true;

const Game: React.FC = () => {
    const [arr, setArr] = useState<IBoard[]>([]);
    // const [fakeArr, setFakeArr] = useState<IBoard[]>([]);
    const [lastEle, setLastEle] = useState<IBoard>();
    const [socket, SetSocket] = useState<Socket | null>(null);
    const [roomValue, setRoomValue] = useState<string | null>(null);
    const [cnt, setCnt] = useState<number>(1);
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(true);
    const setWhiteTime = useSetRecoilState(whiteTimeState);
    const [hFlag, setHFlag] = useState(false);

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
        setHFlag(true);
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

    useEffect(() => {
        if (flag2) {
            console.log("received-trigger")
            if (BlackIntervalId) clearInterval(BlackIntervalId);
            const newWhiteIntervalId = setInterval(() => {
                setWhiteTime((time) => ((time != 0) ? time - 1 : 0));
            }, 1000)
            console.log(newWhiteIntervalId);
            changeWhiteIntervalId(newWhiteIntervalId);
            console.log(WhiteIntervalId);
        }
    }, [flag2])

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
        if (!parentFlag) return;
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
            if (childElement.nodeName === "IMG") {
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

    if(!hFlag){
        return null;
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <UpTimer />
            <Hooks />
            <After arr={arr} drag={drag} dragEnter={dragEnter} DragEnd={DragEnd} TouchStart={TouchStart} ></After>
            <DownTimer />
        </>
    )
}
let cc = true;

const UpTimer = () => {
    // console.log("up-timer component");
    let time = useRecoilValue(blackTimeState);
    if (time <= 0) {
        parentFlag = false;
        if (cc) {
            toast("Game over");
            cc = false;
        }
    }
    return (
        <>
            <div className="  flex justify-center w-full pt-20  pb-2">
                <div className=" flex justify-start w-96 ">
                    <Timer time={time} />
                </div>
            </div>
        </>
    )
}

const DownTimer = () => {
    // console.log("down-timer component");
    const time = useRecoilValue(whiteTimeState);
    if (time <= 0) {
        parentFlag = false;
        if (cc) {
            toast("Game Over");
            cc = false;
        }
    }
    return (
        <>
            <div className="  flex justify-center w-full pt-2">
                <div className=" flex justify-end w-96 ">
                    <Timer time={time} />
                </div>
            </div>
        </>
    )
}

export default Game;