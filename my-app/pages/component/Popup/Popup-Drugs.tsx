import { useEffect, useState } from "react";
import GetSearchMed from "@/pages/api/GET/GetSearchMed";
import DrugItem from "./Popup-List-Drugs";
import { ImCross } from "react-icons/im";
import PostDispense from "@/pages/api/POST/PostDispense";

interface PopupProps {
  onClose: (close: boolean) => void;
  pdid: number 
}

type DrugInfo = {
  id: number;
  type: string;
};

type Dispense = {
  medicine_id: number;
  medicine_usage_frequency_id: number;
  medicine_usage_time_id: number;
  amount: number;
};

export const PopupDrugs = ({ onClose, pdid }: PopupProps) => {
  const [drugs, setDrugs] = useState<{ [key: string]: DrugInfo }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDrugs, setSelectedDrugs] = useState<DrugInfo[]>([]);
  const [filteredDrugs, setFilteredDrugs] = useState<string[]>([]);
  const [formDispense, setFormDispense] = useState<Dispense[]>([]); 

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

  const handleFormDispenseUpdate = (newDispense: Dispense[]) => {
    setFormDispense(prev => [...prev, ...newDispense]);
  };

  const handleSubmit = async () => {
    try {
      if (pdid) {
        const res = await PostDispense({ formData: formDispense, pdid: pdid });
        onClose(false);
        console.log(res);
      }
    } catch (error) {
        console.error("Error sending data:", error);
    }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 overflow-auto">
      <div className="bg-white p-8 rounded-xl min-w-[800px] xl:min-w-[1000px] ">
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
          <h2 className="text-lg font-semibold ">ยาที่เลือก</h2>
          <div className="rounded-lg p-2 h-[500px] overflow-auto scrollbar-hidden">
            {selectedDrugs.map(drug => (
              <DrugItem 
                key={drug.id} 
                drug={{ id: drug.id, type: drug.type }} 
                onUpdateDispense={handleFormDispenseUpdate} 
              />
            ))}
          </div>

          <div className="flex justify-center">
          <button
            type="button"
            className="bg-[#042446] border border-black text-white px-8 p-4 rounded-xl mt-4  hover:text-black hover:bg-white"
            onClick={handleSubmit} 
          >
            บันทึกข้อมูล
          </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PopupDrugs;
