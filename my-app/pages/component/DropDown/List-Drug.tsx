import { useEffect, useState } from "react";
import Dropdown from "./Drop-Down";
import { RxCross1 } from "react-icons/rx";

type DrugProps = {
  drugName: string; 
  onDelete: () => void; 
};

export const ListDrug = ({ drugName, onDelete }: DrugProps) => {
  const [selectedOptionUse, setSelectedOptionUse] = useState(""); 
  const [selectedOptionTime, setSelectedOptionTime] = useState(""); 
  const [selectedOptionQuantity, setSelectedOptionQuantity] = useState(""); 

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionQuantity(event.target.value);
  };

  useEffect(() => {
    console.log("Selected Time:", selectedOptionTime); 
    console.log("Selected Use Method:", selectedOptionUse); 
    console.log("Selected Quantity:", selectedOptionQuantity); 
  }, [selectedOptionTime, selectedOptionUse, selectedOptionQuantity]);

  return (
    <div className="mx-4 p-2 border bg-gray-200 text-black transition-all">
      <div className="p-4 mx-4 flex justify-between items-center">
        <div className="w-28">{drugName}</div> 

        <div>
          <Dropdown
            label="เวลา" 
            value={selectedOptionTime}
            onChange={setSelectedOptionTime}
          />
        </div>

        <div>
          <Dropdown
            label="วิธีใช้" 
            value={selectedOptionUse}
            onChange={setSelectedOptionUse}
          />
        </div>

        <div className="relative">
          <input
            type="number"
            className="border border-black rounded-xl p-3 bg-gray-200 h-[50px] w-full"
            value={selectedOptionQuantity}
            onChange={handleQuantityChange} 
            placeholder="จำนวน" 
          />
        </div>

        <div>
          <button onClick={onDelete} className="text-red-600">
            <RxCross1 size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListDrug;
