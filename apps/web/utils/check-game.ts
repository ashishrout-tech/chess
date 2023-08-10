"use client"

import { IBoard } from "../interface";

export const CHECK = (startPiece: IBoard, endPiece: IBoard, arr: IBoard[]) => {
    console.dir(startPiece);
    console.dir(endPiece);
    console.dir(arr);

    if(startPiece.color === "black") return true;

    if (startPiece.type === "pawn") {
        return checkPawn(startPiece.pos, endPiece.pos, arr)

    }

    if(startPiece.type === "rook"){
        return checkRook(startPiece.pos, endPiece.pos, arr)
    }

    if(startPiece.type === "horse"){
        return checkHorse(startPiece.pos, endPiece.pos, arr)
    }

    if(startPiece.type === "bishop"){
        return checkBishop(startPiece.pos, endPiece.pos, arr)
    }

    if(startPiece.type === "queen"){
        return checkQueen(startPiece, endPiece, arr)
    }

    if(startPiece.type === "king"){
        return checkKing(startPiece.pos, endPiece.pos, arr)
    }

    return true;
}

function checkKing(sPos: string, ePos: string, arr: IBoard[]){
    let sr = parseInt(sPos[0]), sc = parseInt(sPos[2])
    let er = parseInt(ePos[0]), ec = parseInt(ePos[2])

    console.log(sr, sc);
    console.log(er, ec);

    
}

function checkQueen(startPiece: IBoard, endPiece: IBoard, arr: IBoard[]){
    if (checkRook(startPiece.pos, endPiece.pos, arr)) return true;
    if (checkBishop(startPiece.pos, endPiece.pos, arr)) return true;
    return false;
}

function checkBishop(sPos: string, ePos: string, arr: IBoard[]){
    let sr = parseInt(sPos[0]), sc = parseInt(sPos[2])
    let er = parseInt(ePos[0]), ec = parseInt(ePos[2])

    console.log(sr, sc);
    console.log(er, ec);


    const check1 = (Math.abs(sr-er) === Math.abs(sc-ec));
    if(check1){
        if(sr < er && sc < ec){
            sr++, sc++;
            while(sr < er && sc < ec){
                if(present(sr, sc, arr)) return false;
                sr++, sc++;
            }
        }
        else if(sr > er && sc < ec){
            sr--, sc++;
            while(sr > er && sc < ec){
                if(present(sr, sc, arr)) return false;
                sr--, sc++;
            }
        }
        else if(sr < er && sc > ec){
            sr++, sc--;
            while(sr < er && sc > ec){
                if(present(sr, sc, arr)) return false;
                sr++, sc--;
            }
        }
        else if(sr > er && sc > ec){
            sr--, sc--;
            while(sr > er && sc > ec){
                if(present(sr, sc, arr)) return false;
                sr--, sc--;
            }
        }
    }
    else {
        return false;
    }

    return true;

}

function checkHorse(sPos: string, ePos: string, arr: IBoard[]){
    let sr = parseInt(sPos[0]), sc = parseInt(sPos[2])
    let er = parseInt(ePos[0]), ec = parseInt(ePos[2])

    console.log(sr, sc);
    console.log(er, ec);

    if( (Math.abs(sr-er) === 1) && Math.abs(sc-ec) === 2) return true;
    if( (Math.abs(sc-ec) === 1) && Math.abs(sr-er) === 2) return true;
    return false;
}

function checkRook(sPos: string, ePos: string, arr: IBoard[]){
    let sr = parseInt(sPos[0]), sc = parseInt(sPos[2])
    let er = parseInt(ePos[0]), ec = parseInt(ePos[2])

    console.log(sr, sc);
    console.log(er, ec);

    if(sr !== er && sc !== ec) {
        // console.log("1")
        return false;
    }    
    if(sr === er){
        if(sc <= ec){
            for(let c = sc+1; c < ec; c++){
                if(present(sr, c, arr)) {
                    // console.log("2")
                    return false;
                }    
            }
        }
        else{
            for(let c = ec+1; c < sc; c++){
                if(present(sr, c, arr)) {
                    // console.log("3")
                    return false;
                }    
            }
        }
    }
    else if(sc === ec){
        if(sr <= er){
            for(let r = sr+1; r < er; r++){
                if(present(r, sc, arr)) {
                    // console.log("4")
                    return false;
                }    
            }
        }
        else {
            for(let r = er+1; r < sr; r++){
                if(present(r, sc, arr)) {
                    // console.log("5")
                    return false;
                }    
            }
        }
    }
    // console.log("6")
    return true;
}

function checkPawn(sPos: string, ePos: string, arr: IBoard[]) {
    let sr = parseInt(sPos[0]), sc = parseInt(sPos[2])
    let er = parseInt(ePos[0]), ec = parseInt(ePos[2])

    console.log(sr, sc);
    console.log(er, ec);

    if(sr-1 === er && arr[(er-1)*8 + ec - 1].type !== "." && sc === ec) {
        // console.log("1")
        return false;
    }    
    if(sr-1 === er && (sc === ec)){console.log(sr, sc);
        console.log(er, ec);
        // console.log("2")
        return true;
    }    
    if((ec === sc+1 || ec === sc-1) && sr-1 === er && arr[(er-1)*8 + ec - 1].type !== "."){
        // console.log("3")
        return true;
    }    
    if(sr === 7 && sr-2 === er && sc === ec && arr[(sr-2)*8+ ec - 1].type === "."){
        // console.log("5")
        return true;
    }
    // console.log("10") 
    return false;

}

function present(r: number, c: number, arr: IBoard[]){
    if(arr[(r-1)*8 + c -1].type !== ".") {
        return true;
    }    
    return false;
}

