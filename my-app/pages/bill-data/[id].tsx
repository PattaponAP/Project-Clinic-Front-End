import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GetBillById from "../api/GET/GetBillData";

interface BillItem {
  description: string;
  quantity: number;
}

interface BillData {
  id: number;
  date: string;
  thai_id: string;
  full_name: string;
  appointment: string;
  items: BillItem[];
  price: number;
}

export default function BillDataComponent() {
  const router = useRouter();
  const { id } = router.query;
  const [billData, setBillData] = useState<BillData[]>([]);

  useEffect(() => {
    if (id) {
      GetBillById(id).then((data) => setBillData(data));
    }
  }, [id]);

  return (
    <div className="p-4 h-[880px] bg-gray-200 rounded-xl overflow-auto scrollbar-hidden">
      {billData.length > 0 && 
      <div className="text-2xl mb-2 p-2 w-full  rounded-xl flex flex-col gap-2">
        <div className="font-semibold">คุณ {billData[0].full_name}</div>
        <div className="text-xl"><span className="font-semibold">เลขประจำตัวประชาชน</span> : {billData[0].thai_id}</div>
        </div>
      
      }
      <div className="space-y-4">
        {billData.map((bill, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-lg font-semibold">
              ครั้งที่ {index + 1}
            </h2>
            <div>วันที่เข้ารักษา : {new Date(bill.date).toLocaleDateString()}</div>
            <div>วันที่นัดหมาย : {new Date(bill.appointment).toLocaleDateString() === "10/10/1000" ? "ไม่มี" : new Date(bill.appointment).toLocaleDateString()}</div>
            <div>ราคาทั้งหมด : {bill.price} บาท</div>
            <div className="mt-2">
              <h3 className="font-semibold text-lg">รายการสินค้า :</h3>
              {bill.items.length > 0 ? (
                <div className="list-disc pl-5 px-8">
                  {bill.items.map((item, idx) => (
                    <li key={idx}>
                      {item.description} - {item.quantity} ชิ้น
                    </li>
                  ))}
                </div>
              ) : (
                <p>ไม่มีรายการสินค้า</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
