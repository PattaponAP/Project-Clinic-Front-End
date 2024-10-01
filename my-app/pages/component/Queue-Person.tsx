import { useEffect, useState } from "react";
import GetQueue from "../api/GET/GetQueue";
import { Loading } from "./Loading/Loading";

type userProps = {
    id: number;
    patient_daily_id: number;
    full_name: string;
    on_create: string;
    symptom: string; 
};

export const QueuePersonal = () => {
    const [queueData, setQueueData] = useState<userProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQueueData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await GetQueue();
            setQueueData(data);
        } catch (error) {
            setError("Failed to fetch queue data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQueueData();

        const intervalId = setInterval(() => {
            fetchQueueData();
        }, 180000);

        return () => clearInterval(intervalId);
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="text-nowrap">
            <div className="min-h-[280px] max-h-[280px] scrollbar-hidden overflow-y-auto">
                <table className="w-full mt-2 overflow-x-auto">
                    <thead className="sticky top-0 bg-gray-200 ">
                        <tr>
                            <th className="p-2 border border-black w-1/12">ลำดับการคิว</th>
                            <th className="p-2 border border-black w-3/12">ชื่อ - นามสกุล</th>
                            <th className="p-2 border border-black w-2/12">เวลาเข้า</th>
                            <th className="p-2 border border-black w-3/12">อาการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queueData.map((info) => (
                            <tr key={info.id} className="hover:bg-black hover:bg-opacity-10">
                                <td className="p-2 border border-black text-center">{info.patient_daily_id}</td>
                                <td className="p-2 border border-black text-center">{info.full_name}</td>
                                <td className="p-2 border border-black text-center">{info.on_create}</td>
                                <td className="p-2 border border-black text-center">{info.symptom}</td> {/* แสดงข้อมูลอาการ */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QueuePersonal;
