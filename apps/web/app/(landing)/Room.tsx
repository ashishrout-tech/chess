import {Button, buttonVariants} from "@overpowered-monorepo/ui/components/ui/button"
import { cn } from "@overpowered-monorepo/ui/lib/utils";

const Room = () => {
    return (
        <div className=" flex-col sm:flex-row flex justify-center gap-20 flex-wrap">
            <Button className={cn(buttonVariants({ variant: "default", size: "xl" }), " text-xl")}>Create Game</Button>

            <Button className={cn(buttonVariants({ variant: "default", size: "xl" }), " text-xl")}>Join Game</Button>
        </div>
    )
}

export default Room;