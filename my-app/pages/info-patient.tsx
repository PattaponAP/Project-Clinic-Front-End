import { useEffect, useState } from "react";
import { Loading } from "./component/Loading/Loading";
import GetAllPatient from "./api/GET/GetAllPatient";

// กำหนดประเภทข้อมูล Patient
type Patient = {
  thai_id: string;
  full_name: string;
  tel: string;
  address: string;
  gender: string;
  date_of_birth: string;
  ucs: boolean;
  id: number;
  patient_id: string;
};

export default function InfoPatient() {
  const [drugData, setDrugData] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await GetAllPatient();
        if (res) {
          setDrugData(res);
          console.log("res ok");
        }
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      {error ? (
        <p className="text-red-500 font-semibold">Failed to load data: {error}</p>
      ) : isLoading ? (
        <p className="flex justify-center"><Loading size={150} /></p>
      ) : (
        <>
          <h1 className="font-bold text-3xl text-center mb-6">ข้อมูลผู้ป่วย</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drugData.length > 0 ? (
              drugData.map((patient) => (
                <div key={patient.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-lg font-semibold text-gray-800">{patient.full_name}</div>
                  <div className="text-gray-600 mt-1">เบอร์โทร :{patient.tel} </div>
                  <div className="text-gray-600">ที่อยู่ : {patient.address}</div>
                  <div className="text-gray-600">เพศ : {patient.gender}</div>
                  <div className="text-gray-600">วันเกิด : {new Date(patient.date_of_birth).toLocaleDateString()}</div>
                  <div className="text-gray-600">เลขบัตรประชาชน : {patient.patient_id}</div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">ไม่มีข้อมูล</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
