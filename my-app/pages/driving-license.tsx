import doctor_note_printer from "@/printer/medical_certified_printer";
import { useState } from "react";
import PostMedCert from "./api/POST/PostMedCert";
import GetMedCert from "./api/GET/GetMedCert";

export default function DoctorForm() {
  const [formData, setFormData] = useState({
    sheet_no: "",
    prefix: "",
    fullname: "",
    address: "",
    thai_id: "",
    congenital: "",
    surgery: "",
    hospitalize: "",
    epilepsy: "",
    etc: "",
    weight: "",
    height: "",
    blood_pressure: "",
    heart_rate: "",
    diagnose: "",
    diagnose_etc: "",
    comment: "",
  });

  const [address2, setAddress2] = useState("");
  const [surgeryDetail, setSurgeryDetail] = useState("");
  const [congenitalDetail, setCongenitalDetail] = useState("");
  const [hospitalizeDetail, setHospitalizeDetail] = useState("");
  const [epilepsyDetail, setEpilepsyDetail] = useState("");
  const [etcDetail, setEtcDetail] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "sheet_no",
      "prefix",
      "fullname",
      "address",
      "thai_id",
      "weight",
      "height",
      "blood_pressure",
      "heart_rate",
      "diagnose",
    ];

    const medCertData = {
      sheet_no: Number(formData.sheet_no),
      prefix: formData.prefix,
      fullname: formData.fullname,
      address: formData.address,
      thai_id: formData.thai_id,
      congenital: formData.congenital === "กรอกข้อมูล" ? congenitalDetail : formData.congenital,
      surgery: formData.surgery === "กรอกข้อมูล" ? surgeryDetail : formData.surgery,
      hospitalize: formData.hospitalize === "กรอกข้อมูล" ? hospitalizeDetail : formData.hospitalize,
      epilepsy: formData.epilepsy === "กรอกข้อมูล" ? epilepsyDetail : formData.epilepsy,
      etc: formData.etc === "กรอกข้อมูล" ? etcDetail : formData.etc,
      weight: Number(formData.weight),
      height: Number(formData.height),
      blood_pressure: formData.blood_pressure,
      heart_rate: Number(formData.heart_rate),
      diagnose: formData.diagnose,
      diagnose_etc: formData.diagnose_etc,
      comment: formData.comment,
    };

    try {
      const res = await PostMedCert(medCertData);
      console.log(res);
      if (res) {
        doctor_note_printer(
          res.sheet_no,
          res.no,
          res.prefix,
          res.fullname,
          res.address,
          res.address2,
          res.thai_id,
          res.congenital,
          res.surgery,
          res.hospital,
          res.epilepsy,
          res.other,
          res.date,
          res.weight,
          res.height,
          res.blood_pressure,
          res.heart_rate,
          res.diagnose,
          res.diagnose_etc,
          res.comment
        );
        console.log("FORM POST OK");
      }
    } catch (error) {
      console.error("Error submitting medical certificate:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-md shadow-md h-full overflow-hidden">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        แบบฟอร์มใบรับรองแพทย์
      </h1>
      <div className="max-h-[750px] min-w-full overflow-y-auto scrollbar-hidden">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Personal Info */}

          <div className="flex flex-col ">
            <label htmlFor="sheet_no" className="font-semibold">
              เลขที่แผ่น:
            </label>
            <input
              type="number"
              id="sheet_no"
              name="sheet_no"
              value={formData.sheet_no}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="thai_id" className="font-semibold">
              หมายเลขบัตรประชาชน:
            </label>
            <input
              type="text"
              id="thai_id"
              name="thai_id"
              value={formData.thai_id}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="prefix" className="font-semibold">
              คำนำหน้า:
            </label>
            <input
              type="text"
              id="prefix"
              name="prefix"
              value={formData.prefix}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            </div>
          <div className="flex flex-col">
            <label htmlFor="full_name" className="font-semibold">
              ชื่อเต็ม:
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="address" className="font-semibold">
              ที่อยู่:
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
         
          
          {/* Optional Medical Info */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="surgery" className="font-semibold">
              การผ่าตัด:
            </label>
            <select
              id="surgery"
              name="surgery"
              value={formData.surgery}
              onChange={(e) => {
                handleInputChange(e);
                if (e.target.value === "กรอกข้อมูล") {
                  setSurgeryDetail("");
                }
              }}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">ไม่มี</option>
              <option value="กรอกข้อมูล">กรอกข้อมูล</option>
            </select>
            {formData.surgery === "กรอกข้อมูล" && (
              <input
                type="text"
                value={surgeryDetail}
                onChange={(e) => setSurgeryDetail(e.target.value)}
                className="p-2 border border-gray-300 rounded mt-2"
                placeholder="กรุณากรอกรายละเอียดการผ่าตัด"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="congenital" className="font-semibold">
              โรคประจำตัว:
            </label>
            <select
              id="congenital"
              name="congenital"
              value={formData.congenital}
              onChange={(e) => {
                handleInputChange(e);
                if (e.target.value === "กรอกข้อมูล") {
                  setCongenitalDetail("");
                }
              }}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">ไม่มี</option>
              <option value="กรอกข้อมูล">กรอกข้อมูล</option>
            </select>
            {formData.congenital === "กรอกข้อมูล" && (
              <input
                type="text"
                value={congenitalDetail}
                onChange={(e) => setCongenitalDetail(e.target.value)}
                className="p-2 border border-gray-300 rounded mt-2"
                placeholder="กรุณากรอกรายละเอียดโรคประจำตัว"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="hospitalize" className="font-semibold">
              ต้องนอนโรงพยาบาล:
            </label>
            <select
              id="hospitalize"
              name="hospitalize"
              value={formData.hospitalize}
              onChange={(e) => {
                handleInputChange(e);
                if (e.target.value === "กรอกข้อมูล") {
                  setHospitalizeDetail("");
                }
              }}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">ไม่มี</option>
              <option value="กรอกข้อมูล">กรอกข้อมูล</option>
            </select>
            {formData.hospitalize === "กรอกข้อมูล" && (
              <input
                type="text"
                value={hospitalizeDetail}
                onChange={(e) => setHospitalizeDetail(e.target.value)}
                className="p-2 border border-gray-300 rounded mt-2"
                placeholder="กรุณากรอกรายละเอียดการนอนโรงพยาบาล"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="epilepsy" className="font-semibold">
              โรคลมชัก:
            </label>
            <select
              id="epilepsy"
              name="epilepsy"
              value={formData.epilepsy}
              onChange={(e) => {
                handleInputChange(e);
                if (e.target.value === "กรอกข้อมูล") {
                  setEpilepsyDetail("");
                }
              }}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">ไม่มี</option>
              <option value="กรอกข้อมูล">กรอกข้อมูล</option>
            </select>
            {formData.epilepsy === "กรอกข้อมูล" && (
              <input
                type="text"
                value={epilepsyDetail}
                onChange={(e) => setEpilepsyDetail(e.target.value)}
                className="p-2 border border-gray-300 rounded mt-2"
                placeholder="กรุณากรอกรายละเอียดโรคลมชัก"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="etc" className="font-semibold">
              อื่นๆ:
            </label>
            <select
              id="etc"
              name="etc"
              value={formData.etc}
              onChange={(e) => {
                handleInputChange(e);
                if (e.target.value === "กรอกข้อมูล") {
                  setEtcDetail("");
                }
              }}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">ไม่มี</option>
              <option value="กรอกข้อมูล">กรอกข้อมูล</option>
            </select>
            {formData.etc === "กรอกข้อมูล" && (
              <input
                type="text"
                value={etcDetail}
                onChange={(e) => setEtcDetail(e.target.value)}
                className="p-2 border border-gray-300 rounded mt-2"
                placeholder="กรุณากรอกรายละเอียดเพิ่มเติม"
              />
            )}
          </div>

          {/* Health Metrics */}
          <div className="flex flex-col">
            <label htmlFor="weight" className="font-semibold">
              น้ำหนัก (กก.):
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="height" className="font-semibold">
              ส่วนสูง (ซม.):
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="blood_pressure" className="font-semibold">
              ความดันโลหิต:
            </label>
            <input
              type="text"
              id="blood_pressure"
              name="blood_pressure"
              value={formData.blood_pressure}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="heart_rate" className="font-semibold">
              อัตราการเต้นของหัวใจ:
            </label>
            <input
              type="number"
              id="heart_rate"
              name="heart_rate"
              value={formData.heart_rate}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Diagnosis */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="diagnose" className="font-semibold">
              การวินิจฉัย:
            </label>
            <input
              type="text"
              id="diagnose"
              name="diagnose"
              value={formData.diagnose}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="diagnose_etc" className="font-semibold">
              การวินิจฉัยเพิ่มเติม:
            </label>
            <textarea
              id="diagnose_etc"
              name="diagnose_etc"
              value={formData.diagnose_etc}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="comment" className="font-semibold">
              หมายเหตุ:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-end col-span-2">
            <button
              type="submit"
              className="bg-[#042446] text-white p-4 px-16 rounded hover:bg-blue-600"
            >
              ส่งข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
