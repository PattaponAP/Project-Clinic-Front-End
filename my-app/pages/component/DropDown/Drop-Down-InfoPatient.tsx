import PutBill from "@/pages/api/PUT/PutBill";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

type Medicine = {
  medicine: string;
  frequency: string;
  time: string;
  amount: number;
};

interface InfoBill {
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
}

interface DropDownInfoPatientProps {
  info: InfoBill;
  onPaymentSuccess: () => void; // Added prop for payment success callback
}

const formatAppointmentDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const DropDownInfoPatient = ({ info, onPaymentSuccess }: DropDownInfoPatientProps) => {
  const handlePayment = async () => {
    try {
      const res = await PutBill(info.id); 
      if (res) {
        console.log(res);
        onPaymentSuccess(); // Call the success callback
      }
    } catch (error) {
      console.error("Payment processing failed:", error);
    }
  };

  return (
    <div className="mx-8 bg-white p-6 text-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all">
      {/* Header ข้อมูลผู้ป่วย */}
      <div className="flex justify-between text-2xl font-semibold mb-6 border-b-2 border-blue-300 pb-2 text-blue-600">
        ข้อมูลผู้ป่วย
        <div>
          <button onClick={handlePayment} className="border p-2 px-4 rounded-lg bg-green-600 text-white text-lg hover:bg-green-700 transition">
            จ่ายเงิน
          </button>
        </div>
      </div>

      {/* ข้อมูลผู้ป่วย */}
      <div className="mb-6 space-y-3 px-4">
        <div className="w-1/2 text-base ">
          <span className="font-medium">ชื่อผู้ป่วย : </span>
          {info.patient_name}
        </div>
        <div className="text-base">
          <span className="font-medium">การวินิจฉัย : </span> {info.diagnose}
        </div>
        <div className="text-base ">
          หมายเหตุ :
          <span className="font-medium text-[18px]"> {info.annotate} </span>
        </div>
      </div>

      {/* ข้อมูลยา */}
      <div className="mb-6">
        <div className="text-lg font-semibold mb-3 text-blue-500">ข้อมูลยา</div>
        {info.medicine.length === 0 ? (
          <div className="text-gray-500 italic">ไม่มีข้อมูลยา</div>
        ) : (
          <div className="space-y-3">
            {info.medicine.map((med, index) => (
              <div
                className="flex px-6 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all"
                key={index}
              >
                <div className="text-sm w-1/4">
                  ชื่อยา :
                  <span className="font-medium text-[18px] "> {med.medicine}</span>
                </div>
                <div className="text-sm w-1/4">
                  ความถี่ :
                  <span className="font-medium text-[18px]"> {med.frequency}</span>
                </div>
                <div className="text-sm w-1/4">
                  เวลา :
                  <span className="font-medium text-[18px]"> {med.time.toUpperCase()}</span>
                </div>
                <div className="text-sm w-1/4">
                  จำนวน :
                  <span className="font-medium text-[18px]"> {med.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ข้อมูลการรักษา */}
      <div className="mb-6">
        <div className="text-lg font-semibold mb-3 text-blue-500">ข้อมูลการรักษา</div>
        <div className="px-4 flex justify-between text-base">
          <div className="flex items-center">
            <div>ทำความสะอาดหู</div>
            {info.ear_cleaning ? <IoMdCheckmark className="text-green-500 ml-4" size={30} /> : <RxCross2 className="text-red-500 ml-4" size={30} />}
          </div>
          <div className="flex items-center">
            <div>ตรวจเยื่อหู</div>
            {info.myringo ? <IoMdCheckmark className="text-green-500 ml-4" size={30} /> : <RxCross2 className="text-red-500 ml-4" size={30} />}
          </div>
          <div className="flex items-center">
            <div>ตรวจการกระทบ</div>
            {info.tapping ? <IoMdCheckmark className="text-green-500 ml-4" size={30} /> : <RxCross2 className="text-red-500 ml-4" size={30} />}
          </div>
        </div>
      </div>

      {/* ข้อมูลการนัดหมาย */}
      <div className="mb-6">
        <div className="text-lg font-semibold mb-3 text-blue-500">ข้อมูลการนัดหมาย</div>
        <div className="text-base">
          <span className="font-medium">วันที่นัดหมาย : </span>
          {formatAppointmentDate(info.appointment)}
        </div>
      </div>
    </div>
  );
};

export default DropDownInfoPatient;
