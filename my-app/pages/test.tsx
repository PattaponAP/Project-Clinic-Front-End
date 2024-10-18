import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import GetSearchMed from "./api/GET/GetSearchMed";

interface DrugsItem {
  id: number;
  type: string;
}

export default function Test() {
  const [drugs, setDrugs] = useState<DrugsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDrugs, setFilteredDrugs] = useState<DrugsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetSearchMed();
        if (res) {
          setDrugs(res.data);
        }
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = drugs.filter(drug =>
      drug.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDrugs(results);
  }, [searchTerm, drugs]);

  const handleSelectDrug = (drug: DrugsItem) => {
    // Handle drug selection (e.g., add to a list or display details)
    console.log("Selected drug:", drug);
  };

  return (
    <div className="fixed inset-0 bg-black h-full w-full bg-opacity-50 flex justify-center items-center">
      <div className="bg-white h-[500px] w-[800px] xl:h-[650px] xl:w-[1000px] rounded-xl p-4 px-8">
        <div className="flex justify-between">
          <div className="space-x-4">
            <label htmlFor="searchInput">Search</label>
            <input
              id="searchInput"
              type="text"
              className="border border-black rounded-xl p-3 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && filteredDrugs.length > 0 && (
              <div className="absolute p-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 h-[350px] max-w-[250px] min-w-[250px] overflow-auto scrollbar-hidden">
                {filteredDrugs.map((drug) => (
                  <div
                    key={drug.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectDrug(drug)}
                  >
                    {drug.type}
                  </div>
                ))}
              </div>
            )}

            <button className="border border-black rounded-xl p-3">
              เรียกข้อมูลเก่า
            </button>
          </div>

          <button>
            <ImCross size={20} />
          </button>
        </div>

        <div className="border mt-4 h-[500px] overflow-auto space-y-4 scrollbar-hidden">
          <div className="p-6 px-8 border rounded-xl bg-gray-200 flex justify-between">
            <div className="w-32"></div>

            <div>Feq</div>

            <div>time</div>

            <div>
              <input className="w-[100px]" type="number" />
            </div>

            <div>ลบ</div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className="p-4 px-8 border border-black rounded-xl">
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}
