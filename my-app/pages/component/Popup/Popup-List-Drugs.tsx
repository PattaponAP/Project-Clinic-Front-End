import React, { useEffect, useState } from "react";
import GetMedSetById from "@/pages/api/GET/GetMedSet";
import GetMedicineById from "@/pages/api/GET/GetMedicine";
import { Drung } from "./Drug";

interface SelectedDrugItemProps {
  drug: {
    id: number;
    type: string;
  };
}

type MedInfo = {
  id: number;
  name: string;
};

type MedSetInfo = {
  medicine_id: number;
  medicine_name: string;
  medicine_usage_frequency_id: number;
  medicine_usage_time_id: number;
  amount: number;
};

type MedForm = {
  medicine_id: number;
  medicine_usage_frequency_id: number;
  medicine_usage_time_id: number;
  amount: number;
};

const DrugItem: React.FC<SelectedDrugItemProps> = ({ drug }) => {
  const [medInfo, setMedInfo] = useState<MedInfo[]>([]);
  const [medSetInfo, setMedSetInfo] = useState<MedSetInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 
      try {
        if (drug.type === "set") {
          const res = await GetMedSetById(drug.id);
          if (res) {
            setMedSetInfo(res.data.details); 
          }
        } else if (drug.type === "med") {
          const res = await GetMedicineById(drug.id);
          if (res) {
            setMedInfo(res.data);
          }
        }
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล โปรดลองอีกครั้ง");
        console.error("Error fetching medicine data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [drug.id, drug.type]);

  console.log("MED : ", medInfo);
  console.log("MEDSET : ", medSetInfo);
  
  return (
    <div className="mb-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div>
            {drug.type === "med" && medInfo.map(med => (
              <div key={med.id} className="text-black text-[18px] ">
              </div>
            ))}
            {drug.type === "set" && medSetInfo.map(set => (
              <div key={set.medicine_id} className="text-black text-[18px]">
                <Drung medicien_name={set.medicine_name} frequency={set.medicine_usage_frequency_id} time={set.medicine_usage_time_id} amount={set.amount}/>
              </div>
            ))}
          </div>
        )}

    
      </div>
  );
};

export default DrugItem;
