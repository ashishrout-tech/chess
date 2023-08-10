import mongoose, { Document, Model } from "mongoose";
import { connectToDb } from "./connect";
import { boardfill } from "../utils/board";
import { IBoard } from '../interface';

try {
    connectToDb();
} catch (error) {
    console.log("DATABASE CONNECTION ERROR");
}

type BoardDocument =  IBoard & Document;

const boardSchema = new mongoose.Schema({
    src: String,
    pos: {
        type: String,
        unique: true,
    },
    color: String,
    type: String,
})

let boardmodel: Model<BoardDocument>;

try {
    boardmodel = mongoose.model("Board") as Model<BoardDocument>;
} catch {
    boardmodel = mongoose.model<BoardDocument>("Board", boardSchema);
}

export default boardmodel;

boardfill();