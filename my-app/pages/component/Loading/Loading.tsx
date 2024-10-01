import { RiLoader4Line } from "react-icons/ri";

export const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full text-gray-400">
            <RiLoader4Line size={80} className="refresh-spin"/>
            Loading . . .
        </div>
    )
}