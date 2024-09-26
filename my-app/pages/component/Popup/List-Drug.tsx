import React, { useState } from "react";

interface ListDrugProps {
    drugs: { id: number; name: string }[];
}

export const ListDrug = ({ drugs }: ListDrugProps) => {
    const [list, setList] = useState<string[]>([]); 

    const handleList = (drugName: string) => {
        if (list.includes(drugName)) {
            setList(prevList => prevList.filter(name => name !== drugName));
        } else {
            setList(prevList => [...prevList, drugName]);
        }
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
                                list.includes(drug.name) ? 'bg-white border border-black text-black' : 'bg-[#042446]'
                            }`}
                            onClick={() => handleList(drug.name)}
                        >
                            <div className="flex items-center justify-center">
                                {list.includes(drug.name) ? (
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
