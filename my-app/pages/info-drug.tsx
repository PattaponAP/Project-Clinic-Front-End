import { useEffect, useState } from "react";
import GetSearchMed from "./api/GET/GetSearchMed";
import { Loading } from "./component/Loading/Loading";

// กำหนดประเภทข้อมูลยา
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
          const drugsArray = Object.entries(res.data) as [string, Drug][]; 
          setDrugData(drugsArray); 
        }
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      {error ? (
        <p className="text-red-500 font-semibold">Failed to load data: {error}</p>
      ) : isLoading ? (
        <p className="flex justify-center"><Loading size={150} /></p>
      ) : (
        <>
          <h1 className="font-bold text-3xl text-center mb-6">ข้อมูลยา</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drugData.length > 0 ? (
              drugData.map(([name, drug]) => (
                <div key={drug.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-lg font-semibold text-gray-800">{name}</div>
                  <div className="text-gray-600">ประเภท: <span className="text-red-500">{drug.type.toUpperCase()}</span></div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">ไม่มีข้อมูล</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
