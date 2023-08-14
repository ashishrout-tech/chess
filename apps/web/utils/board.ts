import board from "../db/boardmodel";


const black = ["/../../../black/b-rook.png", "/../../../black/b-horse.png", "/../../../black/b-bishop.png", "/../../../black/b-queen.png", "/../../../black/b-king.png",  "/../../../black/b-bishop.png", "/../../../black/b-horse.png", "/../../../black/b-rook.png"];

for (let i = 1; i <= 8; i++) {
    black.push("/../../../black/b-pawn.png");
}

const white = [];

for (let i = 1; i <= 8; i++) {
    white.push("/../../../white/w-pawn.png");
}
white.push("/../../../white/w-rook.png", "/../../../white/w-horse.png", "/../../../white/w-bishop.png",  "/../../../white/w-queen.png", "/../../../white/w-king.png", "/../../../white/w-bishop.png", "/../../../white/w-horse.png", "/../../../white/w-rook.png");

const arr = [];
black.forEach((ele) => {
    arr.push(ele);
})


for (let i = 3; i <= 6; i++) {
    for (let j = 1; j <= 8; j++) {
        arr.push(".");
    }
}

white.forEach((ele) => {
    arr.push(ele);
})


export const boardfill = () => {
    arr.forEach(async (ele, i) => {
        const r = Math.floor(i / 8) + 1;
        const c = i % 8 + 1;

        let type = ".";
        let color = ".";
        if (ele != ".") {
            type = "";
            for (let i = 18; i < ele.length; i++) {
                if (ele[i] == '.') break;
                type += ele[i];
            }
            color = ele.slice(10, 15);
        }

        const doc = await board.findOne({ pos: `${r}-${c}` });
        if (!doc) {
            await board.create({
                src: ele,
                pos: `${r}-${c}`,
                type: type,
                color: color,
            })
        }
    })
}
