import { useEffect, useState } from "react";
import GetSearchMed from "./api/GET/GetSearchMed";
import { Loading } from "./component/Loading/Loading";

type Drug = {
  id: number;
  type: string;
};

export default function InfoDrug() {
  const [drugData, setDrugData] = useState<[string, Drug][]>([]); // ข้อมูลยา
  const [error, setError] = useState<string | null>(null); // สำหรับเก็บ error
  const [isLoading, setIsLoading] = useState<boolean>(true); // สำหรับแสดงสถานะการโหลด

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // เริ่มโหลดข้อมูล
      try {
        const res = await GetSearchMed();
        if (res && res.data) {
          const drugsArray = Object.entries(res.data) as [string, Drug][]; // แปลงข้อมูลเป็น array
          setDrugData(drugsArray); // เก็บข้อมูลใน state
        }
      } catch (err: any) {
        setError(err.message); // เก็บ error message
        console.error(err);
      } finally {
        setIsLoading(false); // เสร็จสิ้นการโหลดไม่ว่าจะสำเร็จหรือไม่
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {error ? (
        <p className="text-red-500">Failed to load data: {error}</p> 
      ) : isLoading ? (
        <p><Loading size={150}/></p> 
      ) : (
        <>
          <div className="font-bold mb-4 text-[28px] space-y-4">Drug Information</div>
          <div className=" min-h-full overflow-auto ">
          {drugData.length > 0 ? (
            <div className="space-y-4">
              {drugData.map(([name, drug]) => (
                <div key={drug.id} className="flex justify-evenly p-4 px-8 w-full border border-x-0">
                  <div className="w-1/4 text-[20px] font-semibold">{name}</div> 
                  <div>TYPE : <span className="text-red-500 text-[20px]">{drug.type.toUpperCase()}</span></div> 
                </div>
              ))}
            </div>
            
          ) : (
            <p>No data available</p> 
          )}
          </div>
        </>
      )}
    </div>
  );
}
