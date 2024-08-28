import { useState } from 'react';
import ListDrug from "./List-Drug";

interface PopupProps {
    onClose: (close : boolean) => void
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

export const PopupListDrug = ({onClose} :PopupProps) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 w-full h-screen flex flex-col justify-center items-center p-4 z-10">
            <div className="bg-white w-full max-w-4xl h-4/5 p-6 rounded-xl overflow-hidden">
                <div className="relative flex items-center mb-4">
                    <input type="text" className="border border-black rounded-xl p-3 w-2/5" placeholder="ค้นหายา" />
                    <div className="absolute translate-x-[15px] translate-y-[-25px] px-4 bg-white">ค้นหายา</div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="absolute top-4 right-4 text-[32px] text-gray-600 hover:text-gray-800"
                    >
                    </button>
                </div>

                <div className="space-y-4 p-4 max-h-[600px] overflow-y-auto scrollbar-hidden">
                    <ListDrug drugs={drugs}/>
                </div>

            </div>
            
            <div className='flex justify-center items-center mt-4'>
                    <button onClick={() => onClose(false)} className=' bg-red-500 p-2 px-8 rounded-xl text-white font-semibold'>
                        X ปิดหน้าต่าง
                    </button>
            </div>


        </div>
    );
};

export default PopupListDrug;
