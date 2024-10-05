import React, { useEffect, useState } from "react";
import GetMedicineFequency from "@/pages/api/GET/GetMedicineFequency";
import { Loading } from "../Loading/Loading";

type TimeProp = {
  valueF: number; 
};

interface Option {
  id: number;
  name: string;
}

const DropdownFequency = ({ valueF }: TimeProp) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(valueF);

  useEffect(() => {
    const fetchOptions = async () => {
      const cachedOptions = localStorage.getItem("medicineFrequencyOptions");
      if (cachedOptions) {
        setOptions(JSON.parse(cachedOptions));
        setLoading(false);
      } else {
        try {
          const res = await GetMedicineFequency();
          if (res) {
            setOptions(res.data);
            localStorage.setItem("medicineFrequencyOptions", JSON.stringify(res.data)); // Cache the response
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
              <option key={p.id} value={p.id} >
                {p.name}
              </option>
            ))}
          </select>
        </section>
        <div className=" absolute top-[-12px] bg-gray-200 px-2 text-[15px] left-[10px]">
          วิธีใช้
        </div>

        </div>
      )}
    </div>
  );
};

export default DropdownFequency;
