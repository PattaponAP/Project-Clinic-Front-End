import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import PostProcedure from "../api/POST/PostProcedure";
import { InjectInfo } from "./DropDown/Inject-Info";
import PopupCheck from "./Popup/PopupCheck";
import PutQueue from "../api/PUT/PutQueue";

import doctor_note_printer from "@/printer/docter_note_printer";
import PostDocternote from "../api/POST/PostDocternote";
import Link from "next/link";
import GetDispense from "../api/GET/GetDispense";
import { Itim } from "next/font/google";
import PopupDrugs from "./Popup/Popup-Drugs";

type PatientData = {
  pdid: number;
  diagnose: string;
  earclean: boolean;
  myringo: boolean;
  tapping: boolean;
  price: number;
  appointment: string;
  annotate: string;
  inject_id: number;
};

type DispenseItem = {
  medicine_name: string;
  usage_frequency_name: string;
  usage_time_name: string;
  amount: number;
}

interface PaymentPNProps {
  Id: any;
  thaiId: number | string | undefined;
  name: string | undefined;
}


export const PaymentPN = ({ Id, name, thaiId }: PaymentPNProps) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [earWash, setEarWash] = useState(false);
  const [myringo, setMyringo] = useState(false);
  const [tapping, setTapping] = useState(false);
  const [injection, setInjection] = useState("");
  const [diagnose, setDiagnosis] = useState("");
  const [price, setPrice] = useState("");
  const [appointment, setAppointment] = useState("");
  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] = useState(false); 
  const [showBill, setShowBill] = useState(false);
  const [check, setCheck] = useState(false);

  const [dispenseItem, setDispenseItem] = useState<DispenseItem[]>([])

  const handleToggleEW = () => setEarWash(!earWash);
  const handleToggleMy = () => setMyringo(!myringo);
  const handleToggleTP = () => setTapping(!tapping);

  const handdlePrint = async () => {
    try {
      const res = await PostDocternote({
        name: name,
        diagnose: diagnose,
        comment: notes,
      });

      if (res) {
        doctor_note_printer(
          res.id,
          res.date,
          res.name,
          res.diagnose,
          res.comment
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (!price) {
      alert("ไม่มีข้อมูลราคา กรุณากรอกข้อมูลให้ครบถ้วน");
      return; 
    }
    const finalappointment = appointment || "1000-10-10";
    const finalNotes = notes || "ไม่มี"; 
    const finalDiagnosis = diagnose || "ไม่มี"; 
    const finalInjection = injection ? parseFloat(injection) : 0; 
  
    setIsLoading(true); 
    const patientId = Array.isArray(Id) ? parseInt(Id[0]) : Number(Id);
    
    const formData: PatientData = {
      pdid: patientId,
      diagnose: finalDiagnosis,
      earclean: earWash,
      myringo: myringo,
      tapping: tapping,
      price: parseFloat(price) || 0,
      appointment: finalappointment,  
      annotate: finalNotes,
      inject_id: finalInjection,
    };
  
    try {
      const response = await PostProcedure(formData);

      if (response) {
        
        setShowBill(true);
        setCheck(true);
        
        const res = await PutQueue(Id);
        if (res) {
          console.log(`Patient updated successfully.`);
        }

  
        const timer = setTimeout(() => {
          setCheck(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const getData = async () => {
    const res = await GetDispense(Id);
    if (res) {
      setDispenseItem(res);
    }
  };

  useEffect(() => {
    getData();
    
  }, [Id]);

  useEffect(() => {
    if (!isOpenPopup) {
      getData();  
    }
  }, [isOpenPopup]); 

  return (
    <>
      <div className="relative border border-black p-4 mb-8 text-nowrap">
        <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">
          หัตถการ.
        </div>
        <div className="m-4 space-y-4">
          <div className="grid grid-cols-[40%_auto] w-full gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <button
                  onClick={handleToggleEW}
                  className="border border-black rounded-xl p-3 w-full flex justify-center"
                >
                  {earWash ? <FaCheck size={24} color="green" /> : "-"}
                </button>
                <div className="absolute translate-x-[12px] translate-y-[-65px] px-4 bg-white">
                  Ear Wash
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={handleToggleMy}
                  className="border border-black rounded-xl p-3 w-full flex justify-center"
                >
                  {myringo ? <FaCheck size={24} color="green" /> : "-"}
                </button>
                <div className="absolute translate-x-[12px] translate-y-[-65px] px-4 bg-white">
                  Myringo
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={handleToggleTP}
                  className="border border-black rounded-xl p-3 w-full flex justify-center"
                >
                  {tapping ? <FaCheck size={24} color="green" /> : "-"}
                </button>
                <div className="absolute translate-x-[12px] translate-y-[-65px] px-4 bg-white">
                  Tapping
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <InjectInfo select={setInjection} />
            </div>
          </div>

          <div className="grid grid-cols-[40%_auto] w-full gap-4">
            <hr />
            <div className="relative">
              <input
                type="text"
                value={diagnose}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="border border-black rounded-xl p-3 w-full"
              />
              <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                วินิจฉัย
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border border-black p-4 text-nowrap">
        <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">
          จ่ายเงิน / หมายเหตุ
        </div>

        <div className="grid grid-cols-5 m-4">
          <div className="relative row-span-1 col-span-3 flex ">
            <div className="w-10/12 border border-black rounded-xl h-[150px] p-4">
              <div className=" h-[120px] overflow-auto scrollbar-hidden space-y-2 ">
                {dispenseItem.map(item => (
                  <div key={Id} className="flex justify-between hover:bg-gray-200">
                    <div className="w-24"> {item.medicine_name} </div>
                    <div> {item.usage_frequency_name} </div>
                    <div> {item.usage_time_name} </div>
                    <div className="w-24">จำนวน : {item.amount} </div>
                  </div>
                ))}
                
              </div>
              
            </div>
             
             <div className="flex items-center">
              <button
                  onClick={() => setIsOpenPopup(true)}
                  className="p-4 mx-4 h-full hover:h-2/4  border text-black border-black hover:border hover:border-black rounded-xl hover:bg-[#042446] hover:text-white transition-all"
                >
                  เพิ่มยา
                </button>
              </div>
          </div>

          {isOpenPopup && (
            <PopupDrugs  pdid={Id} thaiId={thaiId} onClose={() => setIsOpenPopup(false)} />
          )}

          <div className="col-span-2 grid grid-rows-2">
            <div className="flex w-full gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border border-black rounded-xl p-3 w-full"
                />
                <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                  ราคา
                </div>
              </div>

              <div className="relative flex-grow">
                <input
                  type="date"
                  value={appointment}
                  onChange={(e) => setAppointment(e.target.value)}
                  className="border border-black rounded-xl p-3 w-full"
                />
                <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                  นัดหมาย
                </div>
              </div>
            </div>

            <div className="relative">
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border border-black rounded-xl p-3 w-full h-full"
              />
              <div className="absolute translate-x-[12px] translate-y-[-90px] px-4 bg-white">
                หมายเหตุ
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-8 items-center mt-4">
        {!showBill ? (
        <button
          onClick={handleSubmit}
          className="p-2 px-8 border border-black bg-[#042446] text-white rounded-xl shadow-xl hover:bg-white hover:text-black transition-all"
          disabled={isLoading} 
        >
          {isLoading ? "กำลังบันทึกข้อมูล..." : "บันทึกข้อมูล"}
        </button>
        ) : (
          <Link 
          href={"/list-queue"}
          className="p-2 px-8 border border-black bg-[#042446] text-white rounded-xl shadow-xl hover:bg-white hover:text-black transition-all">
          ดูคิวทั้งหมด
          </Link>
        )}
        {check && <PopupCheck check={true} />}
        {showBill && (
          <button
            onClick={handdlePrint}
            className="transition-all p-2 px-8 border border-black bg-[#042446] text-white rounded-xl shadow-xl hover:bg-white hover:text-black"
          >
            พิมพ์ใบรับรองแพทย์
          </button>
        )}
      </div>
    </>
  );
};

export default PaymentPN