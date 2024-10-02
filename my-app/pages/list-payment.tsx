import { useEffect, useState } from "react";
import AllPaymentPerson from "./component/All-Payment-Person";
import { LuRefreshCw } from "react-icons/lu";
import GetBill from "./api/GET/GetBill";

type InfoBill = {
  id: number
  patient_name: string
  patient_daily_id: number
  price: number
  appointment: string
  annotate: string
  paid_status: boolean
}
export default function ListPayment() {
  const [bill, setBill] = useState<InfoBill[]>([])

  useEffect(() => {
    const fetchData = async() => {
      const response = await GetBill();

      console.log(response.data)

      if (response) {
        setBill(response.data)
        console.log(response.status)
      }

      fetchData()
    }
  }, [])
  return (
    <div className="relative border border-black h-full">
      <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">
        ลำดับการจ่ายเงิน ทั้งหมด
        <span className="text-[32px] text-red-500">
        </span>
        คน
      </div>
      <div className="p-8 mb-8 space-y-4 w-full h-[calc(100vh-100px)] overflow-y-auto">
        <div className="flex justify-end m-4">
          <button className="p-2">
            <div className="flex items-center space-x-3">
              <span>รีเฟรช</span>
              <LuRefreshCw size={30} className="refresh-spin" />
            </div>
          </button>
        </div>
        {bill.map((q) => (
          <AllPaymentPerson key={q.id} name={q.patient_name} id={q.id} />
        ))}
      </div>
    </div>
  );
}
