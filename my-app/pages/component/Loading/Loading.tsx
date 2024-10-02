import { RiLoader4Line } from "react-icons/ri";

type sizeP = {
    size : number
}

export const Loading = ({size} : sizeP) => {
    return (
        <div className={`flex justify-center items-center text-gray-400 h-full`}>
            <RiLoader4Line size={size} className="refresh-spin" />
        </div>
    );
};
