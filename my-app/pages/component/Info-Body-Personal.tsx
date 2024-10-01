import { useState } from "react";
import PopupCheck from "./Popup/PopupCheck";

type InfoPersonalBodyProps = {
  userInfo: {
    weight: number ;
    height: number ;
    heart_rate: number ;
    temperature: number;
    symptom: boolean; 
    blood_pressure: string; 
    allergy: string;
  };
};

export const InfoBodyPersonal = ({ userInfo }: InfoPersonalBodyProps) => {
  return (
    <div className="text-nowrap">
      <div className="space-y-4">
        <div className="grid grid-cols-[40%_auto] w-full gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                value={userInfo.weight}
                className="border border-black rounded-xl p-3 w-full"
                readOnly
              />
              <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                น้ำหนัก
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={userInfo.height} 
                className="border border-black rounded-xl p-3 w-full"
                readOnly
              />
              <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                ส่วนสูง
              </div>
            </div>
          </div>

          <div className="col-span-1 relative">
            <input
              type="text"
              value={userInfo.allergy} 
              className="border border-black rounded-xl p-3 w-full"
              readOnly
            />
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
              อาการ
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[40%_auto] w-full gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                value={userInfo.heart_rate} 
                className="border border-black rounded-xl p-3 w-full"
                readOnly
              />
              <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                ชีพจร
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={userInfo.temperature} 
                className="border border-black rounded-xl p-3 w-full"
                readOnly
              />
              <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                อุณหภูมิ
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={userInfo.blood_pressure} 
                className="border border-black rounded-xl p-3 w-full"
                readOnly
              />
              <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                ความดัน
              </div>
            </div>
          </div>

          <div className="col-span-1 relative">
            <input
              type="text"
              value={userInfo.allergy} 
              className="border border-red-600 rounded-xl p-3 w-full focus:outline-none focus:border-red-200 text-red-600"
              readOnly
            />
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white text-red-500">
              แพ้ยา
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBodyPersonal;
