import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GetBillById from "../../api/GET/GetBillData";
import Loading from "@/pages/component/Loading/Loading";
import { MdPublishedWithChanges } from "react-icons/md";
import GetPatientById from "@/pages/api/GET/GetPatienById";
import PutPatientEdit from "@/pages/api/PUT/PutPatientEdit";

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
  patient_id: string;
}

interface PatientData {
  thai_id: string;
  full_name: string;
  ucs: boolean;
  address: string;
  gender: string;
  date_of_birth: string;
  tel: string;
  

}

export default function BillDataComponent() {
  const router = useRouter();
  const { id } = router.query;
  const [billData, setBillData] = useState<BillData[]>([]);

  const [patientData, setPatientData] = useState<PatientData[]>([]);

  const [selectUcs, setSelectUcs] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        try {
          const [dataPatient, dataBill] = await Promise.all([
            GetPatientById(id),
            GetBillById(id),
          ]);
          
          setPatientData(dataPatient);
          setSelectUcs(dataPatient[0].ucs);          
          setBillData(dataBill);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchData();
  }, [id]);


  const handleToggle = async () => {
    try {
      const newUcsValue = !selectUcs;
      setSelectUcs(newUcsValue);

      const date = new Date(patientData[0]?.date_of_birth).toISOString().split("T")[0]
  
      const updateuUCS = {
        thai_id: patientData[0]?.thai_id,
        full_name: patientData[0]?.full_name,
        tel: patientData[0]?.tel,
        address: patientData[0]?.address,
        gender: patientData[0]?.gender,
        date_of_birth: date,
        ucs: newUcsValue,
      };
      const res = await PutPatientEdit(updateuUCS)
      if(res){
        console.log("Res OK.")
      }
    } catch (error) {
      console.error("Failed to update UCS:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading size={200} />
      ) : (
        <div className="p-4 overflow-auto scrollbar-hidden">
          {patientData.length > 0 && (
            <div className="text-2xl mb-2 p-2 w-full rounded-xl flex gap-4">
              <div className="flex flex-col space-y-4 p-4">
                <div className="font-semibold text-[#042446]">
                  {patientData[0].full_name}
                </div>
                <div className="text-xl">
                  <span className="font-semibold">เลขประจำตัวประชาชน</span>:{" "}
                  {patientData[0].thai_id}
                </div>
              </div>
              <div className="bg-gray-100 p-4 flex items-center justify-center rounded-xl shadow-xl w-[200px]">
                {selectUcs ? (
                  <div className="text-xl text-green-500 font-semibold">
                    มีสิทธิการรักษา
                  </div>
                ) : (
                  <div className="text-xl text-red-500 font-semibold">
                    ไม่มีมีสิทธิการรักษา
                  </div>
                )}
              </div>
              <button
                onClick={handleToggle}
                className="p-2 px-4 rounded-xl hover:bg-[#042446] hover:text-white transition-all flex items-center"
              >
                <MdPublishedWithChanges size={40} />
              </button>
            </div>
          )}
          <div className="space-y-4 h-[650px] bg-gray-200 rounded-xl p-4">
            {billData.map((bill, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-lg bg-white"
              >
                <h2 className="text-lg font-semibold">ครั้งที่ {index + 1}</h2>
                <div>
                  วันที่เข้ารักษา: {new Date(bill.date).toLocaleDateString()}
                </div>
                <div>
                  วันที่นัดหมาย:{" "}
                  {new Date(bill.appointment).toLocaleDateString() ===
                  "10/10/1000"
                    ? "ไม่มี"
                    : new Date(bill.appointment).toLocaleDateString()}
                </div>
                <div>ราคาทั้งหมด: {bill.price} บาท</div>
                <div className="mt-2">
                  <h3 className="font-semibold text-lg">รายการสินค้า:</h3>
                  {bill.items.length > 0 ? (
                    <div className="list-disc pl-5 px-8">
                      {bill.items.map((item, idx) => (
                        <li key={idx}>
                          {item.description} - {item.quantity}
                          {item.description === "Ear Cleaning" ||
                          item.description === "Tapping" ||
                          item.description === "My Ringo"
                            ? " ชิ้น"
                            : " เม็ด"}
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
      )}
    </>
  );
}
