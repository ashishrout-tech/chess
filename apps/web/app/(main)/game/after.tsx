"use client"

import Image from "next/image";
import { IBoard } from "../../../interface";
import React, { useEffect, useState } from "react";

interface componentProps {
    arr: IBoard[],
    drag: (ele: IBoard) => void,
    dragEnter: (ele: IBoard) => void,
    DragEnd: (ele: IBoard) => void,
    TouchStart: (ele: IBoard, e: React.TouchEvent) => void,
}


const After = (props: componentProps) => {

    const { arr, drag, dragEnter, DragEnd, TouchStart } = props;

    return (
        <>
            <div className=" select-none flex justify-center items-center">
                <Image placeholder='empty' priority={false} className=" h-[32rem]  sm:h-96  w-96 contrast-75 saturate-200 z-0 absolute" width={384} height={384} src={"/board.jpeg"} alt="board" unoptimized={true} />
                <div className=" h-[32rem]  sm:h-96  w-96 z-10 flex flex-wrap ">
                    {
                        arr.map(ele => {
                            if (ele.src == ".") {
                                return <div onTouchStart={(e) => TouchStart(ele, e)} key={ele.pos} draggable={false} onDragEnter={() => dragEnter(ele)} className=" h-[4rem] sm:h-12 w-12 box-border">

                                </div>
                            }
                            return <div onTouchStart={(e) => TouchStart(ele, e)} key={ele.pos} onDragEnd={() => DragEnd(ele)} onDragEnter={() => dragEnter(ele)} onDrag={() => drag(ele)} draggable={true} className=" h-[4rem] sm:h-12 w-12 flex justify-center items-center box-border">
                                <Image className=" h-[35px] w-[32px] sm:h-[30px] sm:w-[30px]" draggable={false} width="30" height="30" src={ele.src} alt="chess" />
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default After;