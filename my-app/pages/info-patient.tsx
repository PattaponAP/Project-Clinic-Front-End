import { useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import GetBill from "./api/GET/GetBill";
import { GrContactInfo } from "react-icons/gr";
import DropDownInfoPatient from "./component/DropDown/Drop-Down-InfoPatient";

type Medicine = {
  medicine: string;
  frequency: string;
  time: string;
  amount: number;
};

type InfoBill = {
  id: number;
  patient_daily_id: number;
  patient_name: string;
  diagnose: string;
  medicine: Medicine[];
  ear_cleaning: boolean;
  myringo: boolean;
  tapping: boolean;
  annotate: string;
  price: number;
  appointment: string;
};

export default function ListPayment() {
  const [bill, setBill] = useState<InfoBill[]>([]);
  const [status, setStatus] = useState<boolean[]>([]);

  const fetchData = async () => {
    const res = await GetBill();

    if (res) {
      setBill(res.data);
      setStatus(Array(res.data.length).fill(false));
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const toggleStatus = (index: number) => {
    setStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  const handleRefresh = () => {
    fetchData(); 
  };

  return (
    <div className="relative border border-black h-full">
      <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">
        ลำดับการจ่ายเงิน ทั้งหมด
        <span className="text-[32px] text-red-500"> {bill.length} </span>
        คน
      </div>
      <div className="p-8 px-16 space-y-4 w-full h-[calc(100vh-100px)] overflow-y-auto scrollbar-hidden">
        <div className="flex justify-end ">
          <button className="p-2" onClick={handleRefresh}>
            <div className="flex items-center space-x-3">
              <span>รีเฟรช</span>
              <LuRefreshCw size={30} className="refresh-spin" />
            </div>
          </button>
        </div>
        {bill.map((q, index) => (
          <div key={q.id}>
            <div className="w-full border-y bg-gray-200 rounded-xl p-4 flex justify-between items-center">
              <div className="w-1/12 text-center">ลำดับที่ {q.id}</div>
              <div className="w-8/12 text-start text-[20px]">{q.patient_name}</div>
              {!status[index] ? (
                <button
                  className="text-center w-32 p-2 px-4 border rounded-2xl bg-green-600 text-white transition-all"
                  onClick={() => toggleStatus(index)}
                >
                  ดูข้อมูล
                </button>
              ) : (
                <button
                  className="flex justify-center text-center w-32 p-2 px-4 border border-black rounded-2xl text-white transition-all"
                  onClick={() => toggleStatus(index)}
                >
                  <GrContactInfo size={24} color="black" />
                </button>
              )}
            </div>

            {/* แสดง DropDownInfoPatient เมื่อกดดูข้อมูล */}
            {status[index] && (
              <DropDownInfoPatient info={q} onPaymentSuccess={handleRefresh} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
