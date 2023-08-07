import { Header } from "@overpowered-monorepo/ui/components/Header"
import { Avatar, AvatarFallback, AvatarImage } from "@overpowered-monorepo/ui/components/ui/avatar"

export default function Page() {
  return (
    <>
      <Header text="Web" />
      <div className=" flex justify-center">
        <div>
          <Avatar className=" top-0 relative hover:top-96 cursor-pointer transition-all ease-in duration-1000 hover:saturate-200 hover:outline-blue-700/30 hover:outline hover:outline-8 hover:outline-offset-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
