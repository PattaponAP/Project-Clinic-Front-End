import { useState, useEffect } from "react";
import AllQueuePerson from "./component/All-Queue-Person";
import { LuRefreshCw } from "react-icons/lu";
import GetQueue from "./api/GET/GetQueue";

type userProps = {
  id: number;
  patient_daily_id: number;
  patient_id: string;
  full_name: string;
};

export default function ListQueue() {
  const [queueData, setQueueData] = useState<userProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQueueData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await GetQueue();
      setQueueData(data);
      setIsLoading(true);
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

  return (
    <div className="relative border border-black h-full">
      <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">
        คิวทั้งหมด{" "}
        <span className="text-[32px] text-red-500">
          {queueData.length}
        </span>{" "}
        คิว
      </div>

      <div className="p-8 mb-8 space-y-4 w-full h-[calc(100vh-100px)] overflow-y-auto">
        <div className="flex justify-end m-4">
          <button onClick={fetchQueueData} className="p-2" disabled={isLoading}>
            <div className="flex items-center space-x-3">
              <span>{isLoading ? "กำลังรีเฟรช..." : "รีเฟรช"}</span>
              <LuRefreshCw size={30} className={isLoading ? "refresh-spin" : ""} />
            </div>
          </button>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        {!isLoading && !error && queueData.length > 0 ? (
          queueData.map((queue) => (
            <AllQueuePerson key={queue.id}  queue={queue} />
          ))
        ) : (
          <div className="flex justify-center items-center h-[300px] text-[30px]"> - ไม่มีข้อมูลคิว -</div>
        )}
      </div>
    </div>
  );
}
