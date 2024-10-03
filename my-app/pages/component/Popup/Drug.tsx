import React, { useEffect, useState } from "react";
import GetMedicineTime from "@/pages/api/GET/GetMedicineTime";
import GetMedicineFequency from "@/pages/api/GET/GetMedicineFequency";

import { FaCheck } from "react-icons/fa6";

type DrungProps = {
  medicien_name: string;
  frequency: number;
  time: number;
  initialAmount: number;
  onChange: (frequency: number, time: number, amount: number) => void;
  onDelete: () => void;
};

export const Drung = ({
  medicien_name,
  frequency,
  time,
  initialAmount,
  onChange,
  onDelete,
}: DrungProps) => {
  const [frequencyOptions, setFrequencyOptions] = useState<
    { id: number; name: string }[]
  >([]);
  const [errorFrequency, setErrorFrequency] = useState<string | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(
    frequency
  );

  const [timeOptions, setTimeOptions] = useState<
    { id: number; name: string }[]
  >([]);
  const [errorTime, setErrorTime] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(time);

  const [amount, setAmount] = useState<number>(initialAmount || 0);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false); // State สำหรับตรวจสอบว่าได้ดึงข้อมูลแล้ว

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [frequencyResponse, timeResponse] = await Promise.all([
          GetMedicineFequency(),
          GetMedicineTime(),
        ]);

        setFrequencyOptions(frequencyResponse.data);
        setTimeOptions(timeResponse.data);
        setIsDataFetched(true); // อัพเดทสถานะเมื่อดึงข้อมูลเสร็จ

        // กำหนดค่าเริ่มต้นถ้ายังไม่มีการเลือก
        if (frequencyResponse.data.length > 0 && selectedFrequency === null) {
          setSelectedFrequency(frequencyResponse.data[0].id);
        }

        if (timeResponse.data.length > 0 && selectedTime === null) {
          setSelectedTime(timeResponse.data[0].id);
        }
      } catch (error) {
        setErrorFrequency("Error fetching frequency data");
        setErrorTime("Error fetching time data");
      }
    };

    if (!isDataFetched) {
      fetchOptions();
    }
  }, [isDataFetched, selectedFrequency, selectedTime]);

  const handleConfirm = () => {
    if (selectedFrequency !== null && selectedTime !== null) {
      onChange(selectedFrequency, selectedTime, amount);
      setIsConfirmed(true);
    } else {
      setErrorFrequency("Please select frequency");
      setErrorTime("Please select time");
    }
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="flex items-center p-3 px-6 border mb-4 rounded-xl bg-gray-200 ">
      <div className="flex w-1/4 mr-4">{medicien_name}</div>

      <div className="flex justify-between gap-4">
        {/* Dropdown Frequency */}
        <div className="relative">
          <select
            value={selectedFrequency ?? 1}
            onChange={(e) => setSelectedFrequency(Number(e.target.value))}
            className="p-2 px-6 rounded-xl border border-black bg-gray-200"
          >
            {frequencyOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="absolute top-[-12px] bg-gray-200 px-2 text-[15px] left-[10px]">
            วิธีใช้
          </div>
        </div>

        {/* Dropdown Time */}
        <div className="relative">
          <select
            value={selectedTime ?? 1}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
            className="p-2 px-6 rounded-xl border border-black bg-gray-200"
          >
            {timeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="absolute top-[-12px] bg-gray-200 px-2 text-[15px] left-[10px]">
            เวลา
          </div>
        </div>

        <div className="relative">
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="จำนวน"
            className="w-3/4 min-w-[150px] px-6 p-2 bg-gray-200 border border-black rounded-xl"
          />
          <div className="absolute top-[-10px] bg-gray-200 px-2 text-[15px] left-[10px]">
            จำนวน
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        {!isConfirmed && (
          <button onClick={handleDelete} className="text-red-500 mr-5">
            ลบ
          </button>
        )}

        {!isConfirmed ? (
          <button
            onClick={handleConfirm}
            className="p-2 w-[80px] border text-white bg-[#042446]  rounded-2xl"
          >
            ยืนยัน
          </button>
        ) : (
          <div className="flex p-2 w-[80px]  rounded-2xl">
            <FaCheck size={30} color="green" />
          </div>
        )}
      </div>

      {errorFrequency && <p className="text-red-500">{errorFrequency}</p>}
      {errorTime && <p className="text-red-500">{errorTime}</p>}
    </div>
  );
};
