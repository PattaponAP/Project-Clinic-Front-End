import { useEffect, useState } from "react";
import PopupListDrug from "./Popup/Popup-List-Drug";

export const PaymentPN = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);

    return (
        <div className="relative border border-black p-4 text-nowrap">
            <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">จ่ายเงิน / หมายเหตุ</div>

            <div className="grid grid-cols-5 m-4">
                <div className="relative row-span-1 col-span-3 h-full">
                    <div className="w-11/12 border border-black rounded-xl h-[150px]">
                        <div className="m-4 text-lg flex flex-col max-h-[120px] overflow-y-scroll scrollbar-hidden">
                            {selectedDrugs.map((drug, index) => (
                                <span key={index}>
                                    <span>- {drug}</span>
                                </span>
                            ))}
                        </div>

                        <div className=" absolute right-20 top-[10px]">
                            <button
                                onClick={() => setIsOpenPopup(true)}
                                className="p-2 border border-white rounded-xl bg-[#042446] text-white hover:bg-white hover:border-black hover:text-black"
                            >
                                เพิ่มยา
                            </button>
                        </div>
                    </div>
                </div>

                {isOpenPopup && (
                    <PopupListDrug
                        onClose={setIsOpenPopup}
                        onListUpdate={setSelectedDrugs}
                    />
                )}

                <div className="col-span-2 grid grid-rows-2 gap-4">
                    <div className="flex w-full gap-4">
                        <div className="relative">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">ราคา</div>
                        </div>

                        <div className="relative flex-grow">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">นัดหมาย</div>
                        </div>
                    </div>

                    <div className="relative flex items-end">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className="absolute translate-x-[12px] translate-y-[-40px] px-4 bg-white">หมายเหตุ</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPN;
