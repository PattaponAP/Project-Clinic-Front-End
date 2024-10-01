import Link from "next/link";

export const AllQueuePerson = ({ queue }: { queue: { id: number; name: string } }) => {
    return (
        <div className="w-full border-y p-3 flex justify-between items-center">
            <div className="w-1/12 text-center">
                ลำดับที่ {queue.id}
            </div>

            <div className="w-5/12 text-start">
                {queue.name}
            </div>

            <Link href={`/examination/user/${queue.id}`} className="p-1 text-white border bg-[#042446] rounded-lg w-1/12 hover:bg-white hover:text-black hover:border-black transition-colors text-center">
                รักษา
            </Link>
        </div>
    );
};

export default AllQueuePerson;
