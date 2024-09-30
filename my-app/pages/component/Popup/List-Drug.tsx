import React, { useState } from "react";

interface ListDrugProps {
    drugs: { id: number; name: string }[];
    onListUpdate: (updatedList: string[]) => void;
}

export const ListDrug = ({ drugs, onListUpdate }: ListDrugProps) => {
    const [selectedList, setSelectedList] = useState<string[]>([]); 

    const handleList = (drugName: string) => {
        let updatedList;
        if (selectedList.includes(drugName)) {
            updatedList = selectedList.filter(name => name !== drugName);
        } else {
            updatedList = [...selectedList, drugName];
        }
        setSelectedList(updatedList);
        onListUpdate(updatedList);
    };

    return (
        <>
            {drugs.map(drug => (
                <div
                    key={drug.id}
                    className="p-4 bg-white shadow-md border-y border-gray-400 w-full rounded-3xl flex flex-col sm:flex-row justify-between items-center"
                >
                    <div className="sm:ml-8 text-center sm:text-left">
                        {drug.name}
                    </div>

                    <div className="flex justify-evenly space-x-4 mt-2 sm:mt-0 sm:space-x-8 sm:mr-8 text-white">
                        <button className="p-2 px-4 bg-[#042446] rounded-2xl">
                            แก้ไขยา
                        </button>

                        <button
                            className={`p-2 px-4 rounded-2xl transition-colors w-[70px] ${
                                selectedList.includes(drug.name) ? 'bg-white border border-black text-black' : 'bg-[#042446]'
                            }`}
                            onClick={() => handleList(drug.name)}
                        >
                            <div className="flex items-center justify-center">
                                {selectedList.includes(drug.name) ? (
                                    <span className="text-[14px] font-extrabold">✔</span>
                                ) : (
                                    <span>จ่ายยา</span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListDrug;
