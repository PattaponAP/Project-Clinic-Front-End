import Link from "next/link";
import PutQueue from "../api/PUT/PutQueue";
import router from "next/router";

interface Queue {
    full_name: string;
    id: number;
    patient_id: string;
    patient_daily_id: number
    index: number
}

interface AllQueuePersonProps {
    queue: Queue;
}

export const AllQueuePerson = ({ queue }: AllQueuePersonProps) => {
   
    return (
        <div className="w-full border-y p-3 flex justify-between items-center text-[18px]">
            <div className="w-1/12 text-center">
                ลำดับที่ {queue.index}
            </div>

            <div className="w-5/12 text-start">
                {queue.full_name}
            </div>
            <Link href={`/examination/user/${queue.patient_daily_id}`} className="bg-[#042446] text-white p-2 px-6 border border-black rounded-xl hover:text-black hover:bg-white">
                รักษา
            </Link>
        </div>
    );
};

export default AllQueuePerson;
