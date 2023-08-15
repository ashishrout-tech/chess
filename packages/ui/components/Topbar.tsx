"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";


interface IProps {
    url: string,
}

const Topbar = (props: IProps) => {
    const { url } = props;

    return (
        <div className=" flex justify-between w-full ">
            <Link className=" w-fit gap-x-2 items-center flex px-2 select-none cursor-pointer" rel="stylesheet" href={"/"} >
                <img className=" p-1 rounded-md bg-white h-10 w-13" src={url === "game" ? "../logo.png": "logo.png"} alt="logo" />
                <p className=" text-xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">CHESS-MANIA</p>
            </Link>
            <div className=" hidden sm:flex items-center mx-8">
                <ul className=" font-mono font-medium text-blue-400 flex space-x-10 text-xl">
                    <li className={cn("hover:bg-black/20 py-0.5 hover:text-blue-200 px-2 cursor-pointer rounded-md hover:shadow-sm transition", (url === "home" ? "bg-black/20 text-blue-200" : ""))}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={cn("hover:bg-black/20 py-0.5 hover:text-blue-200 px-2 cursor-pointer rounded-md hover:shadow-sm transition")}>About</li>
                </ul>
            </div>
        </div>
    )
}

export default Topbar;
