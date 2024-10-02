import React, { useEffect, useState } from "react";
import GetMedicineTime from "@/pages/api/GET/GetMedicineTime";
import { Loading } from "../Loading/Loading";

type TimeProp = {
  valueT: number; // ค่าเริ่มต้นที่ส่งเข้าไป
};

interface Option {
  id: number;
  name: string;
}

const DropdownTime = ({ valueT }: TimeProp) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(valueT);

  useEffect(() => {
    const fetchOptions = async () => {
      const cachedOptions = localStorage.getItem("medicineTimeOptions");
      if (cachedOptions) {
        setOptions(JSON.parse(cachedOptions));
        setLoading(false);
      } else {
        try {
          const res = await GetMedicineTime();
          if (res) {
            setOptions(res.data);
            localStorage.setItem("medicineTimeOptions", JSON.stringify(res.data)); // Cache the response
          } else {
            setError("No data found");
          }
        } catch (error) {
          setError("Error fetching data");
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(Number(event.target.value));
  };

  return (
    <div>
      {loading ? (
        <p><Loading size={20}/></p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative">

        <section>
          <select value={selectedValue} onChange={handleChange} className="p-2 px-6 rounded-xl border border-black bg-gray-200"> 
            {options.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </section>

        <div className=" absolute top-[-12px] bg-gray-200 px-2 text-[15px] left-[10px]">
            เวลา
        </div>

        </div>
      )}
    </div>
  );
};

export default DropdownTime;
