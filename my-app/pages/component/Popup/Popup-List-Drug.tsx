import { useEffect, useState } from "react";
import ListDrug from "../DropDown/List-Drug"; // Import ListDrug component
import { MdEdit } from "react-icons/md";

interface PopupProps {
  onClose: (close: boolean) => void;
  onListUpdate: (updatedList: string[]) => void;
}

// Mock data for drug sets
const drugSets = [
  { id: 1, name: "ชุดยา A", drugs: ["Paracetamol", "Ibuprofen", "Aspirin"] },
  { id: 2, name: "ชุดยา B", drugs: ["Antibiotic A", "Antibiotic B", "Vitamin C"] },
  { id: 3, name: "ชุดยา C", drugs: ["Vitamin D", "Allergy Medicine", "Cough Syrup"] },
  { id: 4, name: "ชุดยา D", drugs: ["Cold Medicine", "Paracetamol", "Ibuprofen"] },
  { id: 5, name: "ชุดยา E", drugs: ["Aspirin", "Antibiotic A", "Vitamin C"] },
  { id: 6, name: "ชุดยา F", drugs: ["Vitamin D", "Allergy Medicine", "Cough Syrup"] },
  { id: 7, name: "ชุดยา G", drugs: ["Cold Medicine", "Paracetamol", "Ibuprofen"] },
  { id: 8, name: "ชุดยา H", drugs: ["Antibiotic B", "Vitamin C", "Aspirin"] },
  { id: 9, name: "ชุดยา I", drugs: ["Vitamin D", "Allergy Medicine", "Cough Syrup"] },
  { id: 10, name: "ชุดยา J", drugs: ["Cold Medicine", "Paracetamol", "Ibuprofen"] },
];

export const PopupListDrug = ({ onClose, onListUpdate }: PopupProps) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [activeDropDownId, setActiveDropDownId] = useState<number | null>(null); // ใช้เก็บ id ของดรอปดาวน์ที่เปิดอยู่

  const handleList = (drugName: string) => {
    const updatedList = selectedList.includes(drugName)
      ? selectedList.filter((name) => name !== drugName)
      : [...selectedList, drugName];

    setSelectedList(updatedList);
  };

  const toggleDropDown = (id: number) => {
    setActiveDropDownId((prevId) => (prevId === id ? null : id)); // เปิดดรอปดาวน์ใหม่หรือปิดดรอปดาวน์ที่เปิดอยู่
  };

  const handleClose = () => {
    onListUpdate(selectedList);
    onClose(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 w-full h-screen flex flex-col justify-center items-center p-4 z-10">
      <div className="bg-white w-full max-w-4xl h-4/5 p-6 rounded-xl overflow-hidden">
        <div className="relative flex items-center mb-4">
          <input
            type="text"
            className="border border-black rounded-xl p-3 w-2/5"
            placeholder="ค้นหายา"
          />
          <div className="absolute translate-x-[15px] translate-y-[-25px] px-4 bg-white">
            ค้นหายา / ชื่อชุดยา
          </div>
        </div>

        <div className="space-y-4 p-4 max-h-[600px] overflow-y-auto scrollbar-hidden">
          {drugSets.map((set) => (
            <div key={set.id}>
              <div className="p-4 bg-white shadow-md border-y border-gray-400 w-full rounded-3xl flex flex-col sm:flex-row justify-between items-center">
                <div className="sm:ml-8 text-center sm:text-left">
                  {set.name}
                </div>

                <div className="flex justify-evenly space-x-4 mt-2 sm:mt-0 sm:space-x-8 sm:mr-8 text-white">
                  <button
                    onClick={() => toggleDropDown(set.id)}
                    className={`flex items-center justify-center w-[70px] p-2 px-4 rounded-2xl border border-black transition-colors ${
                      activeDropDownId === set.id ? "bg-white" : "bg-[#042446]"
                    }`}
                  >
                    {activeDropDownId === set.id ? (
                      <MdEdit className="text-black" />
                    ) : (
                      "แก้ไขยา"
                    )}
                  </button>

                  <button
                    className={`p-2 px-4 rounded-2xl transition-colors w-[70px] ${
                      selectedList.includes(set.name)
                        ? "bg-white border border-black text-black"
                        : "bg-[#042446]"
                    }`}
                    onClick={() => handleList(set.name)}
                  >
                    <div className="flex items-center justify-center">
                      {selectedList.includes(set.name) ? (
                        <span className="text-[14px] font-extrabold">✔</span>
                      ) : (
                        <span>จ่ายยา</span>
                      )}
                    </div>
                  </button>
                </div>
              </div>
              {activeDropDownId === set.id && set.drugs.map((drug) => (
                <ListDrug key={drug} drugName={drug} onDelete={() => {}} /> 
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleClose}
          className="bg-red-500 p-2 px-8 rounded-xl text-white font-semibold"
        >
          X ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
};

export default PopupListDrug;
