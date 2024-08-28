import { useState } from "react"
import ListDrug, { PopupListDrug } from "./Popup/Popup-List-Drug";

export const PaymentPN = () => {

    const [isOpenPopup, setIsOpenPopup] = useState(false);

    return (
        <div className="relative border border-black p-4 text-nowrap">
            <div className=" px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">จ่ายเงิน / หมายเหตุ</div>

            <div className="grid grid-cols-5 m-4">
                <div className="relative row-span-1 col-span-3 h-full">
                    <button onClick={() => setIsOpenPopup(true)} className="border border-black rounded-xl w-4/5 h-full hover:text-gray-500 text-[18px] text-gray-300">กดเพื่อเลือกยา</button>
                    <div className="absolute translate-x-[12px] translate-y-[-130px] px-4 bg-white">จ่ายยา</div>
                </div>

                {isOpenPopup && (
                    <PopupListDrug onClose={setIsOpenPopup}/>
                )
                }

                <div className=" col-span-2 grid grid-rows-2 gap-4">
                    <div className="flex w-full gap-4">
                        
                        <div className="relative">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">ราคา</div>
                        </div>

                        <div className="relative">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">นัดหมาย</div>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" className="border border-black rounded-xl p-3 w-4/5" />
                        <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">หมายเหตุ</div>
                    </div>
                </div>
            </div>
           
          
        </div>
    )
}

export default PaymentPN