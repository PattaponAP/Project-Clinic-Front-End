import { useEffect, useState } from "react";
import GetSearchMed from "@/pages/api/GET/GetSearchMed";
import DrugItem from "./Popup-List-Drugs";
import { ImCross } from "react-icons/im";

interface PopupProps {
  onClose: (close: boolean) => void;
}

type DrugInfo = {
  id: number;
  type: string;
};

export const PopupDrugs = ({ onClose }: PopupProps) => {
  const [drugs, setDrugs] = useState<{ [key: string]: DrugInfo }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDrugs, setSelectedDrugs] = useState<DrugInfo[]>([]);
  const [filteredDrugs, setFilteredDrugs] = useState<string[]>([]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = Object.keys(drugs).filter(key =>
      key.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDrugs(filtered);
  };

  const handleSelectDrug = (key: string) => {
    const drug = drugs[key];

    if (!selectedDrugs.some(d => d.id === drug.id && d.type === drug.type)) {
      setSelectedDrugs(prev => [...prev, { ...drug }]);
    }

    setSearchTerm("");
    setFilteredDrugs([]);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 w-full h-screen flex flex-col justify-center items-center p-4 z-10 min-w-[1000px]">
      <div className="bg-white w-full min-w-5xl max-w-5xl h-4/5 p-6 rounded-xl overflow-hidden">
        <div className="relative flex items-center mb-4">
          <input
            type="text"
            className="border border-black rounded-xl p-3 max-w-[250px] min-w-[250px]"
            placeholder="ค้นหายา"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute translate-x-[15px] translate-y-[-25px] px-4 bg-white">
            ค้นหายา / ชื่อชุดยา
          </div>
          <div className="absolute right-[-10px] top-[-10px] hover:text-red-600">
            <button className="py-2 px-4 rounded" onClick={() => onClose(false)}>
              <ImCross size={25} />
            </button>
          </div>
        </div>

        {searchTerm && filteredDrugs.length > 0 && (
          <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-w-[250px] min-w-[250px]">
            {filteredDrugs.map(key => (
              <div
                key={key}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectDrug(key)}
              >
                {key}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-lg font-semibold">ยาที่เลือก</h2>
          <div className="max-h-full overflow-y-auto rounded-lg p-2">
            {selectedDrugs.map(drug => (
              <DrugItem 
                key={drug.id} 
                drug={{ id: drug.id, type: drug.type }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDrugs;
