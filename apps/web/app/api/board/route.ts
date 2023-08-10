
import boardmodel from "../../../db/boardmodel";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const board = await boardmodel.find().sort({pos: 1});
        const newBoard = []
        board.forEach((ele)=>{
            newBoard.push(ele);
        })
        return NextResponse.json({message: newBoard});
    } catch (error) {
        return NextResponse.json({error: "Internal Server error"})
    }
}