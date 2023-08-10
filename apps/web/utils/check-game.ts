"use client"

import { IBoard } from "../interface";

export const CHECK = (startPiece: IBoard, endPiece: IBoard, arr: IBoard[]) => {
    console.dir(startPiece);
    console.dir(endPiece);
    console.dir(arr);

    if (startPiece.type === "pawn") {
        return checkPawn(startPiece.pos, endPiece.pos, arr)

    }

    return true;
}

function checkPawn(sPos: string, ePos: string, arr: IBoard[]) {
    let sr = parseInt(sPos[0]), sc = parseInt(sPos[2])
    let er = parseInt(ePos[0]), ec = parseInt(ePos[2])

    console.log(sr, sc);
    console.log(er, ec);

    if(sr-1 === er && arr[(er-1)*8 + ec - 1].type !== "." && sc === ec) {
        console.log("1")
        return false;
    }    
    if(sr-1 === er && (sc === ec)){
        console.log("2")
        return true;
    }    
    if((ec === sc+1 || ec === sc-1) && sr-1 === er && arr[(er-1)*8 + ec - 1].type !== "."){
        console.log("3")
        return true;
    }    
    if(sr === 7 && sr-2 === er && sc === ec && arr[(sr-2)*8+ ec - 1].type === "."){
        console.log("5")
        return true;
    }
    console.log("10") 
    return false;

}