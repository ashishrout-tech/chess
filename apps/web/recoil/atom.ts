import { atom } from "recoil";

// const [time, setTime] = useState(1000);

export const blackTimeState = atom({
    key: "blackTimeState",
    default: 60,
})
export const whiteTimeState = atom({
    key: "whiteTimeState",
    default: 60,
})