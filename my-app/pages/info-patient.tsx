import { useEffect, useState } from "react";
import GetSearchMed from "./api/GET/GetSearchMed";
import { Loading } from "./component/Loading/Loading";

type Drug = {
  id: number;
  type: string;
};

export default function InfoPatient() {
  const [drugData, setDrugData] = useState<[string, Drug][]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true);  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
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
                  <div className="w-1/4 text-[16px] font-semibold">{name}</div> 
                  <div>TYPE : <span className="text-red-500 text-[16px]">{drug.type.toUpperCase()}</span></div> 
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
