import { useEffect, useState } from "react";
import GetSearchMed from "./api/GET/GetSearchMed";
import { Loading } from "./component/Loading/Loading";

type Drug = {
  id: number;
  type: string;
};

export default function InfoDrug() {
  const [drugData, setDrugData] = useState<[string, Drug][]>([]); 
  const [filteredData, setFilteredData] = useState<[string, Drug][]>([]); 
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [searchQuery, setSearchQuery] = useState<string>(""); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const res = await GetSearchMed();
        if (res && res.data) {
          const drugsArray = Object.entries(res.data) as [string, Drug][]; 
          setDrugData(drugsArray); 
          setFilteredData(drugsArray); 
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = drugData.filter(([name]) => 
      name.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 h-[880px] overflow-auto scrollbar-hidden">
      {error ? (
        <p className="text-red-500 font-semibold">Failed to load data: {error}</p>
      ) : isLoading ? (
        <p className="flex justify-center"><Loading size={150} /></p>
      ) : (
        <>
          <h1 className="font-bold text-3xl text-center mb-6">ข้อมูลยา</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="ค้นหาชื่อยา"
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full md:w-1/4 mx-auto"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.length > 0 ? (
              filteredData.map(([name, drug]) => (
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
