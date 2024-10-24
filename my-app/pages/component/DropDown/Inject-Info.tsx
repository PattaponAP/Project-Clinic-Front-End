import GetInject from "@/pages/api/GET/GetInject";
import { useEffect, useState } from "react";

type InjectInfo = {
  id: number;
  name: string;
};

export const InjectInfo = ({ select }: { select: (value: string) => void }) => {
  const [inject, setInject] = useState<InjectInfo[]>([]);
  const [selectedInject, setSelectedInject] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetInject();
        setInject(response.data);
      } catch (error) {
        console.error("Error fetching inject data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedInject(value);
    select(value);
  };

  return (
    <div className="relative">
      <select
        value={selectedInject}
        onChange={handleSelectChange}
        className="border border-black rounded-xl p-3 w-full"
      >
        <option value="" disabled>
          เลือกการฉีดยา
        </option>
        {inject.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
        การฉีดยา
      </div>
    </div>
  );
};

export default InjectInfo