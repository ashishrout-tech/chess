import { Button } from "@overpowered-monorepo/ui/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@overpowered-monorepo/ui/components/ui/dialog";
import { Input } from "@overpowered-monorepo/ui/components/ui/input"
import { Label } from "@overpowered-monorepo/ui/components/ui/label"
import { useState } from "react";

interface ComponentProps {
    title: string,
    description: string,
    button: string

}

const GetDialogContent = (props: ComponentProps) => {

    const { title, description, button } = props;

    const [id, setId] = useState<string>();

    function clicked(){
        window.location.href =`/game/${id}`
    }

    return <DialogContent className=" w-11/12 rounded-lg sm:w-fit bg-slate-950/80">
        <DialogHeader>
            <DialogTitle className=" mb-1 text-white/80">{title}</DialogTitle>
            <DialogDescription className=" text-sm text-muted-foreground sm:text-base">
                {description}
            </DialogDescription>
        </DialogHeader>

        <div className=" mt-4">
            <div className=" flex items-center gap-x-3">
            <Label htmlFor="name" className=" text-base text-white text-right">
              Id:
            </Label>
            <Input onChange={(e) => setId(e.target.value)} id="id" className="text-base text-white" />
            </div>
        </div>

        <DialogFooter className=" mt-5">
        <Button onClick={clicked} variant="outline" size="sm" className=" text-lg">{button}</Button>
        </DialogFooter>

    </DialogContent>
}

export default GetDialogContent;