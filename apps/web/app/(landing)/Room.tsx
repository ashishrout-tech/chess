"use client"

import { Button, buttonVariants } from "@overpowered-monorepo/ui/components/ui/button"
import { cn } from "@overpowered-monorepo/ui/lib/utils";
import { Dialog } from "@overpowered-monorepo/ui/components/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog";
import GetDialogContent from "./GetDialogContent";
import { useEffect, useState } from "react";
import { Skeleton } from "@overpowered-monorepo/ui/components/ui/skeleton";

const Room = () => {

    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    })

    if (!mount) {
        return <div className=" flex-col sm:flex-row flex justify-center gap-20 flex-wrap">
            <Skeleton className={cn(buttonVariants({ variant: "default", size: "xl" }), " w-[10.5rem]")} />
            <Skeleton className={cn(buttonVariants({ variant: "default", size: "xl" }), " ml-2 sm:ml-0 w-[9.4rem]")} />
        </div>
    }

    return (
        <div className=" flex-col sm:flex-row flex justify-center gap-20 flex-wrap">
            <Dialog>
                <DialogTrigger>
                    <Button className={cn(buttonVariants({ variant: "default", size: "xl" }), " text-xl")}>Create Game</Button>
                </DialogTrigger>
                <GetDialogContent title="Create Game" description="Enter the id to create a game. Ask your friend to join the game by entering this id." button = "Create" />
            </Dialog>

            <Dialog>
                <DialogTrigger>
                    <Button className={cn(buttonVariants({ variant: "default", size: "xl" }), " text-xl")}>Join Game</Button>
                </DialogTrigger>
                <GetDialogContent title="Join Game" description="Enter the id to join the game." button = "Join" />
            </Dialog>
        </div>
    )
}

export default Room;