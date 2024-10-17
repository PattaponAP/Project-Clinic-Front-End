import { useEffect, useState } from "react";
import GetQueue from "../api/GET/GetQueue";
import { Loading } from "./Loading/Loading";
import { LuRefreshCw } from "react-icons/lu";

type UserProps = {
    id: number;
    patient_daily_id: number;
    full_name: string;
    on_create: string;
    symptom: string;
    index: number;
};

const extractTime = (isoString: string) => {
    return isoString.split("T")[1].slice(0, 5);
};

export const QueuePersonal = () => {
    const [queueData, setQueueData] = useState<UserProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQueueData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await GetQueue();
            setQueueData(response.data); // อัปเดตข้อมูลใน queueData
        } catch (err) {
            setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQueueData(); 
    }, []);

    const handleRefresh = () => {
        fetchQueueData(); 
    };

    if (isLoading) {
        return <Loading size={150} />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; 
    }

    return (
        <div className="text-nowrap">
             <div className="flex justify-end">
          <button onClick={handleRefresh} className="p-2" disabled={isLoading}>
            <div className="flex items-center space-x-3">
              <span>{isLoading ? "กำลังรีเฟรช..." : "รีเฟรช"}</span>
              <LuRefreshCw size={30} className={isLoading ? "refresh-spin" : ""} />
            </div>
          </button>
        </div>
            <div className="h-[240px] scrollbar-hidden overflow-y-auto">
                <table className="w-full overflow-x-auto">
                    <thead className="sticky top-0 bg-gray-200">
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
                                <td className="p-2 border border-black text-center">{info.index}</td>
                                <td className="p-2 border border-black text-center">{info.full_name}</td>
                                <td className="p-2 border border-black text-center">{extractTime(info.on_create)}</td>
                                <td className="p-2 border border-black text-center">{info.symptom}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QueuePersonal;
