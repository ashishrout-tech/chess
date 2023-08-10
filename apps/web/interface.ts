import mongoose from "mongoose";

export interface IBoard {
    _id: mongoose.Types.ObjectId;
    src: string,
    pos: string,
    color: "white" | "black" | ".",
    type: "king" | "queen" | "rook" | "bishop" | "pawn" | "horse" | ".",
}