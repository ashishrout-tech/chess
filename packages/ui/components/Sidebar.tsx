import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import ProSidebar from "./ProSidebar";

const Sidebar = ({url}: {url: string}) => {
    return (
        <div className=" sm:hidden">
            <Sheet>
                <SheetTrigger>
                    <HamburgerMenuIcon className=" h-6 w-6 mx-5 text-white/70" />
                </SheetTrigger>
                <ProSidebar url = {url} />
            </Sheet>
        </div>
    )
}

export default Sidebar;