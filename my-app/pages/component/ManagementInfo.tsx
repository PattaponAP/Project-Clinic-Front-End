import React, { useState } from "react";
import PutPatient from "../api/PUT/PutPatient";
import { LuRefreshCw } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import InputField from "./Field/InputField";
import GetPatienByThai_Id from "../api/GET/GetPatienByThai_Id";

interface InfoBodyProps {
  setCheck: (value: boolean) => void;
}

export const ManagementInfo = ({ setCheck }: InfoBodyProps) => {
  const [loadingSearch, setLoadingSearch] = useState(false); 
  const [loadingSubmit, setLoadingSubmit] = useState(false); 


  const [formData, setFormData] = useState({
    thai_id: "",
    full_name: "",
    tel: "",
    address: "",
    gender: "",
    date_of_birth: "",
    ucs: false,
    height: 0,
    weight: 0,
    blood_pressure: "",
    heart_rate: 0,
    temperature: 0,
    allergy: "",
    symptom: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "usc" ? value === "true" : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSearch = async () => {
    if (formData.thai_id) {
      setLoadingSearch(true); 
      try {
        const response = await GetPatienByThai_Id(formData.thai_id);

        if (response && response.length > 0) {
          const patient = response[0];
          const history = patient.history.length > 0 ? patient.history[0] : {};
          const dateOfBirth = new Date(patient.date_of_birth).toISOString().split('T')[0];
  
          setFormData((prevData) => ({
            ...prevData,
            full_name: patient.full_name,
            tel: patient.tel,
            address: patient.address,
            gender: patient.gender,
            date_of_birth: dateOfBirth, 
            ucs: patient.ucs,
            height: history.height || 0,
            weight: history.weight || 0,
            blood_pressure: history.blood_pressure || "",
            heart_rate: history.heart_rate || 0,
            temperature: history.temperature || 0,
            allergy: history.allergy || "",
            symptom: history.symptom || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoadingSearch(false); 
      }
    } else {
      alert("กรุณากรอกเลขบัตรประชาชนก่อนค้นหา");
    }
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true); 
    if (!formData.thai_id || !formData.full_name || !formData.tel || !formData.gender || !formData.date_of_birth) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      setLoadingSubmit(false); 
      return;
    }
    try {
      const response = await PutPatient(formData);
      if (response) {
        setCheck(true);
      }
    } catch (error) {
      console.error("Error:", error);

    } finally {
      setLoadingSubmit(false); 
    }


  };

  return (
    <div className="mb-8">
      <div className="relative border border-black mb-12">
        <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">
          ผู้ป่วย
        </div>
        <div className="p-8">
          <div className="text-nowrap">
            <div className="space-y-4">
              <div className="grid grid-cols-3 w-full gap-4">
                <div className="relative">
                  <InputField
                    type="text"
                    name="thai_id"
                    value={formData.thai_id}
                    onChange={handleChange}
                    label="เลขบัตรประชาชน"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-[6px] bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                    disabled={loadingSearch}
                  >
                    {loadingSearch ? (
                      <LuRefreshCw size={20} className="refresh-spin" />
                    ) : (
                      <BiSearch size={22} />
                    )}
                  </button>
                </div>

                <InputField
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  label="ชื่อ - นามสกุล"
                />
                <InputField
                  type="text"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  label="เบอร์โทรศัพท์"
                />
              </div>

              <div className="grid grid-cols-9 w-full gap-4">
                <div className="relative col-span-3">
                  <InputField
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    label="ที่อยู่"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    name="usc"
                    onChange={handleChange}
                    className="border border-black rounded-xl p-3 w-full"
                  >
                    <option value="true">มี</option>
                    <option value="false">ไม่มี</option>
                  </select>
                  <div className="absolute translate-x-[12px] translate-y-[-62px] px-4 bg-white">
                    สิทธิการรักษา
                  </div>
                </div>
                <InputField
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="เพศ"
                />
                <div className="col-span-3">
                  <InputField
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    label="วันเกิด"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ข้อมูลร่างกาย */}
      <div className="relative border border-black">
        <div className="absolute text-[28px] top-[-25px] left-[25px] px-4 bg-white">
          ข้อมูลร่างกาย
        </div>

        <div className="p-8">
          <div className="text-nowrap">
            <div className="space-y-4">
              <div className="grid grid-cols-[40%_auto] w-full gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    label="น้ำหนัก"
                  />
                  <InputField
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    label="ส่วนสูง"
                  />
                </div>

                <InputField
                  type="text"
                  name="symptom"
                  value={formData.symptom}
                  onChange={handleChange}
                  label="อาการ"
                />
              </div>

              <div className="grid grid-cols-[40%_auto] w-full gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    type="text"
                    name="blood_pressure"
                    value={formData.blood_pressure}
                    onChange={handleChange}
                    label="ความดัน"
                  />
                  <InputField
                    type="number"
                    name="heart_rate"
                    value={formData.heart_rate}
                    onChange={handleChange}
                    label="ชีพจร"
                  />
                  <InputField
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    label="อุณหภูมิ"
                  />
                </div>
                <InputField
                  type="text"
                  name="allergy"
                  value={formData.allergy}
                  onChange={handleChange}
                  label="แพ้ยา"
                  className="rounded-xl p-3 w-full "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">

        <button
          onClick={handleSubmit}
          disabled={loadingSubmit}
          className={`bg-[#042446] text-white p-5 mx-8 m-4 border px-8 rounded-xl transition-colors 
            hover:bg-white hover:border-black hover:text-[#042446] hover:shadow-[8px_5px_5px_rgba(0,0,0,0.5)]
            ${loadingSubmit ? "bg-white border-black" : ""}`}
        >
          {loadingSubmit ? (
            <LuRefreshCw size={20} color="black" className="refresh-spin" />
          ) : (
            "เข้าคิวรักษา"
          )}{" "}
        </button>
      </div>
    </div>
  );
};

export default ManagementInfo;
