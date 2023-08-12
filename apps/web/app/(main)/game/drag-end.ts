"use client"

import { Socket } from "socket.io-client";
import { IBoard } from "../../../interface";
import { CHECK, beforeCheckOnKing, cell } from "../../../utils/check-game";
import { Dispatch, SetStateAction } from "react";


function DragEnd(socket: Socket, startEle: IBoard, lastEle: IBoard, arr: IBoard[], cnt: number,  setArr: Dispatch<SetStateAction<IBoard[]>>, flag2: boolean, flag3: boolean, roomValue: string, setFlag2: Dispatch<SetStateAction<boolean>>, setFlag3: Dispatch<SetStateAction<boolean>>) {

    if(flag3 && startEle.color === "black") return;

    if(!flag2 && !flag3) return;

    if(startEle.color === 'black' && cnt === 1){
        return;
    }
    else if(startEle.color === 'white' && cnt === 2){
        return;
    }
    
    if (startEle.color === lastEle.color) {
        return;
    }

    // if(checkOnKing(arr, cnt) && startEle.type !== "king") {
    //     return;
    // }    

    const isValid = CHECK(startEle, lastEle, arr, cnt);
    if (!isValid) return;


    if(cnt === 1){
        if( startEle.color === "white" && beforeCheckOnKing(startEle, lastEle, arr, cnt, "white")){
            return;
        }
        else{
            if( startEle.color === "black" && beforeCheckOnKing(startEle, lastEle, arr, cnt, "black")){
                return;
            }
        }
    }
    else{
        if( startEle.color === "black" && beforeCheckOnKing(startEle, lastEle, arr, cnt, "black")){
            return;
        }
        else{
            if(startEle.color === "white" && beforeCheckOnKing(startEle, lastEle, arr, cnt, "white")){
                return;
            }
        }
    }
    
    
    // console.log(startEle.pos);
    // console.log(lastEle.pos);
    // console.log(arr);
    
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

    let newFakeArr: IBoard[] = [];
    for (let r = 1; r <= 8; r++) {
        for (let c = 1; c <= 8; c++) {
            let clr = newArr[cell(9 - r, c)].color;
            newFakeArr.push({ ...newArr[cell(9 - r, c)], pos: `${r}-${c}`});
        }
    }
    // setFakeArr(newFakeArr);
    
    // console.dir(newArr);
    if (socket) {
        socket.emit('piece-moved', newFakeArr, roomValue);
    }
    setArr(newArr);
    setFlag2(false);
    setFlag3(false);
}

export default DragEnd;