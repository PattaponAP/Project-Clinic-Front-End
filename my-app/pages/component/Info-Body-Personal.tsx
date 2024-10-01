import { useState } from "react";
import PopupCheck from "./Popup/PopupCheck";

interface InfoBodyProps {
    buttonCheck: boolean;
}

export const InfoBodyPersonal = ({ buttonCheck }: InfoBodyProps) => {
    const [isVisible, setIsVisible] = useState(false); 

    const handleButtonClick = () => {
        setIsVisible(true); 
        setTimeout(() => {
            setIsVisible(false); 
        }, 2000); 
    };

    return (
        <div className="text-nowrap">
            <div className="space-y-4">
                <div className="grid grid-cols-[40%_auto] w-full gap-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="relative">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">น้ำหนัก</div>
                        </div>

                        <div className="relative">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">ส่วนสูง</div>
                        </div>
                    </div>

                    <div className="col-span-1 relative">
                        <input type="text" className="border border-black rounded-xl p-3 w-full" />
                        <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">ความดัน</div>
                    </div>
                </div>

                <div className="grid grid-cols-[40%_auto] w-full gap-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="relative">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">ชีพจร</div>
                        </div>

                        <div className="relative">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">อุณหภูมิ</div>
                        </div>

                        <div className="relative">
                            <input type="text" className="border border-black rounded-xl p-3 w-full" />
                            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">อาการ</div>
                        </div>
                    </div>

                    <div className="col-span-1 relative">
                        {buttonCheck ? (
                            <>
                                <input type="text" className="border border-red-600 rounded-xl p-3 w-full focus:outline-none focus:border-red-200" />
                                <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 text-red-600 bg-white">แพ้ยา</div>
                            </>
                        ) : (
                            <>
                                <input type="text" className="border border-black rounded-xl p-3 w-full " />
                                <div className="absolute translate-x-[12px] translate-y-[-62px] px-4  bg-white">วินิจฉัย</div>
                            </>
                        )}
                    </div>
                </div>

                {buttonCheck && (
                    <div className="w-full flex justify-end items-end">
                        <button
                            onClick={handleButtonClick} 
                            className="bg-[#042446] text-white p-5 border px-8 rounded-xl transition-colors hover:bg-white hover:border-black hover:text-[#042446] hover:shadow-[8px_5px_5px_rgba(0,0,0,0.5)]">
                            เข้าคิวรักษา
                        </button>
                    </div>
                )}

                {isVisible && <PopupCheck check={false} title="บันทึกคิวสำเร็จ"/>}

            </div>
        </div>

    );
};

export default InfoBodyPersonal;
