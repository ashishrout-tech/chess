"use client"

import { Socket, io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IBoard } from "../../../../interface";
import After from "./after";
import DragEnds, { Hooks } from "./drag-end";
import { cell } from "../../../../utils/check-game";
import { Timer } from "./Timer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { blackTimeState, whiteTimeState } from "../../../../recoil/atom";
import { BlackIntervalId, WhiteIntervalId, changeBlackIntervalId, changeWhiteIntervalId } from "./variables";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "next/navigation";
import { Skeleton } from "@overpowered-monorepo/ui/components/ui/skeleton"


let startCell: IBoard | null = null;
let endCell: IBoard | null = null;

let parentFlag = true;
let sFlag = true;
let flag = true;

let sCount = 0;

const Game: React.FC = () => {
    const [arr, setArr] = useState<IBoard[]>([]);
    // const [fakeArr, setFakeArr] = useState<IBoard[]>([]);
    const [lastEle, setLastEle] = useState<IBoard>();
    const [socket, SetSocket] = useState<Socket | null>(null);
    const [roomValue, setRoomValue] = useState<string | null>(null);
    const [cnt, setCnt] = useState<number>(1);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(true);
    const setWhiteTime = useSetRecoilState(whiteTimeState);
    const [hFlag, setHFlag] = useState(false);
    const params = useParams()

    useEffect(() => {
        const newSocket = io('ws://localhost:5173');
        SetSocket(newSocket);
        newSocket.on("connect", () => {
            const newRoomValue = params.id as string;


            newSocket.emit("join-room", newRoomValue, (message: string, cnt: number) => {
                if (cnt === 1) {
                    toast("You joined as white.")
                    setTimeout(() => {
                        toast("Wait for black to join.")
                    }, 3000)
                }
                else {
                    toast("You joined as black");
                    setTimeout(() => {
                        toast("Wait for the first move.")
                    }, 3000)

                }
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
                if(sCount === 1)setArr(response.data.message);
                ++sCount;
                // setFakeArr(response.data.message);
            } catch (error) {
                console.log(error);
                toast.error("Some error occurred");
            }
        }
        fetchBoard();
        setHFlag(true);
    }, [])

    ///////
    if (socket) {

        socket.on("receive-newBoard", (arr: string) => {
            const newArr = JSON.parse(arr);
            setArr(newArr);
            setFlag2(true);
            setFlag3(false);
        })
        socket.on("receive-playerJoined", (cnt: number) => {
            // console.log(cnt, "count")
            if (cnt === 2) {
                if (sFlag) {
                    toast("2nd Player Joined");
                    setTimeout(() => {
                        toast("make the first move");
                    }, 3000)
                    sFlag = false;
                }
            }

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

    if (sCount === 2 && cnt === 2 && flag) {
        console.log("2-start");
        console.dir(arr);
        let newFakeArr = [];
        for (let r = 1; r <= 8; r++) {
            for (let c = 1; c <= 8; c++) {
                newFakeArr.push({ ...arr[cell(9 - r, c)], pos: `${r}-${c}` });
            }
        }
        flag = false;
        console.dir(newFakeArr)
        console.dir(arr)
        setArr(newFakeArr);
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
        if (!parentFlag) return;
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

    if (!hFlag) {
        return <div className=" pt-2 mt-28 select-none flex justify-center items-center">
            <Skeleton className=" bg-white/60 h-[32rem]  sm:h-96  w-96" />
        </div>
    }

    return (
        <>
            <ToastContainer hideProgressBar={true} theme="dark" position="top-center" limit={1} autoClose={1000} />
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