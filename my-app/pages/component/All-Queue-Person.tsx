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

            <Link href={`/examination/user/${queue.id}`} className="p-1 border border-black rounded-lg w-1/12 hover:bg-black transition-colors text-center">
                รักษา
            </Link>
        </div>
    );
};

export default AllQueuePerson;
