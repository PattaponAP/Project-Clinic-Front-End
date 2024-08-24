import { useState } from "react";

export const AllPaymentPerson = ({ queue }: { queue: { id: number; name: string } }) => {
    const [status, setStatus] = useState(false);

    const toggleStatus = () => {
        setStatus(!status);
    }

    return (
        <div className="w-full border-y p-4  flex justify-between items-center">
            <div className="w-1/12 text-center">
                ลำดับที่ {queue.id}
            </div>

            <div className="w-5/12 text-start">
                {queue.name}
            </div>

            {status ? (<div className="text-center w-32 p-2 px-4 border rounded-2xl bg-green-600 text-white" onClick={toggleStatus}>
                ชำระแล้ว
            </div>) : (<div className="text-center w-32 p-2 px-4 border rounded-2xl bg-red-600 text-white" onClick={toggleStatus}>
                ยังไม่ชำระ
            </div>)

            }
        </div>
    );
};

export default AllPaymentPerson;
