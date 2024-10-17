import React, { useEffect, useState } from "react";
import GetMedSetById from "@/pages/api/GET/GetMedSet";
import GetMedicineById from "@/pages/api/GET/GetMedicine";
import { Drug } from "./Drug";

interface SelectedDrugItemProps {
  drug: {
    id: number;
    type: string;
  };
  onUpdateDispense: (dispense: Dispense[]) => void; 
}

interface MedInfo {
  id: number;
  name: string;
  medicine_usage_frequency_id: number;
  medicine_usage_time_id: number;
  amount: number;
}

interface MedSetInfo extends MedInfo {
  medicine_id: number;
  medicine_name: string;
  
}

type Dispense = {
  medicine_id: number;
  medicine_usage_frequency_id: number;
  medicine_usage_time_id: number;
  amount: number;
};

const DrugItem: React.FC<SelectedDrugItemProps> = ({ drug, onUpdateDispense }) => {
  const [medSetInfo, setMedSetInfo] = useState<MedSetInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    [key: number]: { frequency: number; time: number; amount: number };
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let res;
        if (drug.type === "set") {
          res = await GetMedSetById(drug.id);
          if (res && res.data && Array.isArray(res.data.details)) {
            setMedSetInfo(res.data.details);
          } else {
            setError("ข้อมูลเซ็ตไม่ถูกต้อง");
          }
        } else if (drug.type === "med") {
          res = await GetMedicineById(drug.id);
          if (res && res.data) {
            setMedSetInfo(res.data);
          } else {
            setError("ข้อมูลยาไม่ถูกต้อง");
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

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const newFormDispense: Dispense[] = Object.keys(formData).map((key) => ({
        medicine_id: parseInt(key, 10),
        medicine_usage_frequency_id: formData[parseInt(key, 10)].frequency,
        medicine_usage_time_id: formData[parseInt(key, 10)].time,
        amount: formData[parseInt(key, 10)].amount,
      }));

      onUpdateDispense(newFormDispense);
      
      setFormData({});
    }
  }, [formData, onUpdateDispense]);

  const handleDrungChange = (
    id: number,
    frequency: number,
    time: number,
    amount: number
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: { frequency, time, amount },
    }));
  };

  const handleDeleteMed = (medicineName: string) => {
    setMedSetInfo(prevMedSetInfo => {
      const updatedMedSetInfo = prevMedSetInfo.filter(med => med.name !== medicineName);
      console.log("Updated MedSetInfo (Med):", updatedMedSetInfo); 
      return updatedMedSetInfo;
    });
  };

  const handleDeleteSet = (medicineName: string) => {
    setMedSetInfo(prevMedSetInfo => {
      const updatedMedSetInfo = prevMedSetInfo.filter(set => set.medicine_name !== medicineName);
      console.log("Updated MedSetInfo (Set):", updatedMedSetInfo); 
      return updatedMedSetInfo;
    });
  };

  return (
    <div className="mb-4 ">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {drug.type === "med" &&
            medSetInfo.map((med) => (
              <div key={med.id} className="text-black text-[18px]">
                <Drug
                  medicien_name={med.name}
                  frequency={med.medicine_usage_frequency_id}
                  time={med.medicine_usage_time_id }
                  initialAmount={med.amount}
                  onDelete={() => handleDeleteMed(med.name)}
                  onChange={(frequency, time, amount) =>
                    handleDrungChange(med.id, frequency, time, amount)
                  } 
                />
              </div>
            ))}
          {drug.type === "set" &&
            medSetInfo.map((set) => (
              <div key={set.medicine_id} className="text-black text-[18px] ">
                <Drug
                  medicien_name={set.medicine_name}
                  frequency={set.medicine_usage_frequency_id }
                  time={set.medicine_usage_time_id }
                  initialAmount={set.amount}
                  onDelete={() => handleDeleteSet(set.medicine_name)}
                  onChange={(frequency, time, amount) =>
                    handleDrungChange(set.medicine_id, frequency, time, amount)
                  } 
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DrugItem;
