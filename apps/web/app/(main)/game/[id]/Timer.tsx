interface componentProps {
    time: number,
}

export const Timer = ({ time }: componentProps) => {
    const str = `${(Math.floor(time / 60) < 10) ? "0" : ""}${Math.floor(time / 60)}:${(time % 60 < 10) ? "0" : ""}${(time % 60)}`
    return (
        <div className=" select-none cursor-no-drop rounded-sm bg-red-600 px-1 pr-2">
            <p className=" text-gray-300 text-2xl">{str}</p>
        </div>
    )
}