"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@overpowered-monorepo/ui/lib/utils";
import { IBoard } from "../../../interface";
import { CHECK } from "../../../utils/check-game";


const Game = () => {
    const [arr, setArr] = useState<IBoard[]>([]);
    const [lastEle, setLastEle] = useState<IBoard>();

    useEffect(() => {
        async function fetchBoard() {
           try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/board`);
            setArr(response.data.message);
           } catch (error) {
            console.log(error);
           }
        }
        fetchBoard();
    }, [])

    function drag(ele: IBoard){
        console.log("dragging", ele.pos);
    }
    function dragLeave(ele: IBoard){
        setLastEle(ele);
    }
    function DragEnd(startEle: IBoard){

        if(startEle.color === lastEle.color){
            return;
        }

        const isValid = CHECK(startEle, lastEle, arr);
        if(!isValid) return;
    
        const newArr = arr.map((ele) => {
            if(ele.pos === startEle.pos){
                let SRC = lastEle.src;
                let TYPE = lastEle.type;
                let COLOR = lastEle.color;
                if(lastEle.src !== ".") {
                    SRC = ".",
                    COLOR = ".",
                    TYPE = "."
                }    
                // // if(lastSrc[0].src === ele.src) SRC = ele.src
                return {...ele, src: SRC, type: TYPE, color: COLOR};
            }
            if(ele.pos === lastEle.pos){
                return {...ele, src: startEle.src, type: startEle.type, color: startEle.color};
            }
            return {...ele};
        })
    
        // console.dir(newArr);
        setArr(newArr);
    }

    return (
        <div className="flex justify-center items-center">
            <div className=" bg-red-100 flex mt-10 h-96 w-96 flex-wrap ">
                {
                    arr.map(ele => {
                        if (ele.src == ".") {
                            return <div draggable={false} onDragLeave={() => dragLeave(ele)} className=" border border-black box-border w-12 h-12">

                            </div>
                        }
                        return <div onDragEnd={() => DragEnd(ele)} onDragLeave={() => dragLeave(ele)} onDrag={() => drag(ele)} draggable={true} className=" border border-black box-border w-12 h-12 flex justify-center items-center">
                            <Image draggable={false} width="30" height="30" src={ele.src} alt="chess" />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Game;