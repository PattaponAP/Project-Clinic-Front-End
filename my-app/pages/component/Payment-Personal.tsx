import { useState } from "react";
import axios from "axios";
import PopupListDrug from "./Popup/Popup-Drugs";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import PostProcedure from "../api/POST/PostProcedure";
import { InjectInfo } from "./DropDown/Inject-Info";
import PopupCheck from "./Popup/PopupCheck";
import PutQueue from "../api/PUT/PutQueue";

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

interface PaymentPNProps {
  Id: any
  thaiId: number | string | undefined
}

export const PaymentPN = ({ Id }: PaymentPNProps) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [earWash, setEarWash] = useState(false);
  const [myringo, setMyringo] = useState(false);
  const [tapping, setTapping] = useState(false);
  const [injection, setInjection] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [price, setPrice] = useState("");
  const [appointment, setAppointment] = useState("");
  const [notes, setNotes] = useState("");

  const handleToggleEW = () => setEarWash(!earWash);
  const handleToggleMy = () => setMyringo(!myringo);
  const handleToggleTP = () => setTapping(!tapping);

  const [showBill, setShowBill] = useState(false)
  
  const [check, setCheck] = useState(false)


  const handleSubmit = async () => {
    const patientId = Array.isArray(Id) ? parseInt(Id[0]) : Number(Id);
  
    const formData: PatientData = {
      pdid: patientId,
      diagnose: diagnosis,
      earclean: earWash,
      myringo: myringo,
      tapping: tapping,
      price: parseFloat(price) || 0,
      appointment: appointment,
      annotate: notes,
      inject_id: parseFloat(injection) || 0
    };
  
    try {
      const response = await PostProcedure(formData);
  
      if (response) {
        const res = await PutQueue(Id);
        if (res) {
          console.log(`Patient updated successfully.`);
        }
  
        setShowBill(true);
        setCheck(true);
  
        const timer = setTimeout(() => {
          setCheck(false);
        }, 2000);
      }
  
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <>
      <div className="relative border border-black p-4 mb-8 text-nowrap">
        <div className="px-4 absolute text-[28px] top-[-25px] left-[25px] bg-white">
          หัตถการ
        </div>
        <div className="m-4 space-y-4">
          <div className="grid grid-cols-[40%_auto] w-full gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <button
                  onClick={handleToggleEW}
                  className="border border-black rounded-xl p-3 w-full flex justify-center"
                >
                  {earWash ? <FaCheck size={24} color="green" /> :  "-"}
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
                  {myringo ? <FaCheck size={24} color="green" /> :  "-"}
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
                value={diagnosis}
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
          <div className="relative row-span-1 col-span-3 ">
            <div className="w-11/12 border border-black rounded-xl h-[150px]">
              <div className="m-4 text-lg flex flex-col max-h-[120px] overflow-y-scroll">
                
               {/*โชวยาตรงนี้ */}
              </div>
              <div className="absolute right-20 top-[10px]">
                <button
                  onClick={() => setIsOpenPopup(true)}
                  className="p-2 border border-white rounded-xl bg-[#042446] text-white hover:bg-white hover:border-black hover:text-black"
                >
                  เพิ่มยา
                </button>
              </div>
            </div>
          </div>

          {isOpenPopup && (
            <PopupListDrug
              pdid={Id}
              onClose={() => setIsOpenPopup(false)}
            />
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
        <button
          onClick={handleSubmit}
          className="p-2 px-8 border border-black bg-[#042446] text-white rounded-xl shadow-xl hover:bg-white hover:text-black transition-all"
        >
          บันทึกข้อมูล
        </button>
        {showBill && (
        <button className="transition-all p-2 px-8 border border-black bg-[#042446] text-white rounded-xl shadow-xl hover:bg-white hover:text-black">
          พิมพ์ใบรับรองแพทย์
        </button>
        )}
      </div>
      {check && <PopupCheck check={true}/>}
    </>
  );
};

export default PaymentPN;
