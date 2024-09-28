import { useEffect, useState } from 'react';

interface PopupProps {
    onClose: (close: boolean) => void;
    onListUpdate: (updatedList: string[]) => void;
}

const drugs = [
    { id: 1, name: 'Paracetamol' },
    { id: 2, name: 'Ibuprofen' },
    { id: 3, name: 'Aspirin' },
    { id: 4, name: 'Antibiotic A' },
    { id: 5, name: 'Antibiotic B' },
    { id: 6, name: 'Vitamin C' },
    { id: 7, name: 'Vitamin D' },
    { id: 8, name: 'Allergy Medicine' },
    { id: 9, name: 'Cough Syrup' },
    { id: 10, name: 'Cold Medicine' },
];

export const PopupListDrug = ({ onClose, onListUpdate }: PopupProps) => {
    const [selectedList, setSelectedList] = useState<string[]>([]);

    const handleList = (drugName: string) => {
        let updatedList;
        if (selectedList.includes(drugName)) {
            updatedList = selectedList.filter(name => name !== drugName);
        } else {
            updatedList = [...selectedList, drugName];
        }
        setSelectedList(updatedList);
    };

    const handleClose = () => {
        onListUpdate(selectedList); 
        onClose(false); 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 w-full h-screen flex flex-col justify-center items-center p-4 z-10">
            <div className="bg-white w-full max-w-4xl h-4/5 p-6 rounded-xl overflow-hidden">
                <div className="relative flex items-center mb-4">
                    <input type="text" className="border border-black rounded-xl p-3 w-2/5" placeholder="ค้นหายา" />
                    <div className="absolute translate-x-[15px] translate-y-[-25px] px-4 bg-white">ค้นหายา</div>
                </div>

                <div className="space-y-4 p-4 max-h-[600px] overflow-y-auto scrollbar-hidden">
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
                                    className={`p-2 px-4 rounded-2xl transition-colors w-[70px] ${selectedList.includes(drug.name) ? 'bg-white border border-black text-black' : 'bg-[#042446]'
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
                </div>
            </div>

            <div className="flex justify-center items-center mt-4">
                <button onClick={handleClose} className="bg-red-500 p-2 px-8 rounded-xl text-white font-semibold">
                    X ปิดหน้าต่าง
                </button>
            </div>
        </div>
    );
};

export default PopupListDrug;
