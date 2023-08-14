import { SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProSidebar = ({url}: {url: string}) => {
    return (
        <SheetContent className=" h-full bg-slate-800">
            <div>
                <ul className=" mt-20 text-2xl text-white space-y-20">
                    <li className={ cn( "w-fit px-2 py-1 rounded-md", (url === "home" ? "border-2 bg-black/20": "")) }>
                    <Link href={"/"}>Home</Link>
                    </li>
                    <li className="  w-fit px-2 py-1 rounded-md">About</li>
                </ul>
            </div>
            <div className=" mt-96 flex justify-center">
                <Link className=" w-fit gap-x-2 items-center flex px-2 select-none cursor-pointer" rel="stylesheet" href={"/"} >
                    <img className=" p-1 rounded-md bg-white h-10 w-13" src="logo.png" />
                    <p className=" text-xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">CHESS-MANIA</p>
                </Link>
            </div>
        </SheetContent>
    )
}

export default ProSidebar;