import React from "react";

type InfoPersonalProps = {
  userInfo: {
    patient_id: string;
    full_name: string;
    tel: string;
    address: string;
    ucs: boolean;
    gender: string;
  };
};

const InfoPersonal: React.FC<InfoPersonalProps> = ({ userInfo }) => {

  return (
    <div className="text-nowrap">
      <div className="space-y-4">
        <div className="grid grid-cols-4 w-full gap-4">
          <div className="col-span-1 relative">
            <input
              type="text"
              value={userInfo.patient_id}
              className="border border-black rounded-xl p-3 w-full"
              readOnly
            />
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
              เลขบัตรประชาชน
            </div>
          </div>

          <div className="col-span-2 relative">
            <input
              type="text"
              value={userInfo.full_name}
              className="border border-black rounded-xl p-3 w-full"
              readOnly
            />
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
              ชื่อ - นามสกุล
            </div>
          </div>

          <div className="col-span-1 relative">
            <input
              type="text"
              value={userInfo.tel}
              className="border border-black rounded-xl p-3 w-full"
              readOnly
            />
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
              เบอร์โทรศัพท์
            </div>
          </div>
        </div>

        <div className="grid grid-cols-9 w-full gap-4">
          <div className="relative col-span-3">
            <input
              type="text"
              value={userInfo.address}
              className="border border-black rounded-xl p-3 w-full"
              readOnly
            />
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
              ที่อยู่
            </div>
          </div>

          <div className="relative col-span-2">
            <select
              name="usc"
              className="border border-black rounded-xl p-3 w-full"
              value={userInfo.ucs ? "true" : "false"}
              
            >
              <option value="true">มี</option>
              <option value="false">ไม่มี</option>
            </select>
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
              สิทธิการรักษา
            </div>
          </div>

          <div className="relative col-span-2">
            <input
              type="text"
              value={userInfo.gender}
              className="border border-black rounded-xl p-3 w-full"
              readOnly
            />
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
              เพศ
            </div>
          </div>

          <div className="relative col-span-2">
            <input
              type="text"
              className="border border-black rounded-xl p-3 w-full"
              readOnly
            />
            <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
              วันเกิด
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InfoPersonal;