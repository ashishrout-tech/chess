"use client"

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface IProps{
    url: string
}

const Navbar = (props: IProps) => {
    const {url} = props;

    return (
        <div className=" top-0 fixed pt-px flex items-center w-full h-12 bg-gray-700">
           <Topbar url = {url} />
           <Sidebar url = {url} />
        </div>
    )
}

export default Navbar;
