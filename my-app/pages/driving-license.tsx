import doctor_note_printer from "@/printer/medical_certified_printer";
import { useState } from "react";
import PostMedCert from "./api/POST/PostMedCert";
import GetMedCert from "./api/GET/GetMedCert";

export default function DoctorForm() {
  const [formData, setFormData] = useState({
    sheet_no: "",
    prefix: "",
    full_name: "",
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

  // ใช้ useState สำหรับ input ใหม่
  const [date, setDate] = useState("");
  const [address2, setAddress2] = useState("");
  const [no, setNo] = useState("");

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

    // Validate required fields
    const requiredFields = [
      "sheet_no",
      "prefix",
      "full_name",
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
      full_name: formData.full_name,
      address: formData.address,
      thai_id: formData.thai_id,
      congenital: formData.congenital,
      surgery: formData.surgery,
      hospitalize: formData.hospitalize,
      epilepsy: formData.epilepsy,
      etc: formData.etc,
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
      console.log(res)
      if (res) {
          doctor_note_printer(
            res.sheet_no,
            res.no,
            res.prefix,
            res.full_name,
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
        Doctor Certification Form
      </h1>
      <div className="max-h-[750px] min-w-full overflow-y-auto scrollbar-hidden">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Personal Info */}

          <div className="flex flex-col col-span-2">
            <label htmlFor="sheet_no" className="font-semibold">
              Sheet No:
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
              Thai ID:
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
          <div className="flex flex-col">
            <label htmlFor="full_name" className="font-semibold">
              Full Name:
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="address" className="font-semibold">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="address2" className="font-semibold">
              Additional Address:
            </label>
            <input
              type="text"
              id="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="prefix" className="font-semibold">
              Prefix:
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

          {/* Optional Medical Info */}
          <div className="flex flex-col">
            <label htmlFor="surgery" className="font-semibold">
                Surgery :
            </label>
            <select
              id="surgery"
              name="surgery"
              value={formData.surgery}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">None</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="congenital" className="font-semibold">
              Congenital Disease:
            </label>
            <select
              id="congenital"
              name="congenital"
              value={formData.congenital}
              onChange={(e) =>
                setFormData({ ...formData, congenital: e.target.value })
              }
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">None</option>
              <option value="normal">Normal</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="hospitalize" className="font-semibold">
              Hospitalization:
            </label>
            <select
              id="hospitalize"
              name="hospitalize"
              value={formData.hospitalize}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">None</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="epilepsy" className="font-semibold">
              Epilepsy:
            </label>
            <select
              id="epilepsy"
              name="epilepsy"
              value={formData.epilepsy}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">None</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="etc" className="font-semibold">
              Other Medical Conditions:
            </label>
            <select
              id="etc"
              name="etc"
              value={formData.etc}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="none">None</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="weight" className="font-semibold">
              Weight (kg):
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
              Height (cm):
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
              Blood Pressure:
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
              Heart Rate:
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

          <div className="flex flex-col">
            <label htmlFor="diagnose" className="font-semibold">
              Diagnose:
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

          <div className="flex flex-col">
            <label htmlFor="diagnose_etc" className="font-semibold">
              Diagnose Other:
            </label>
            <input
              type="text"
              id="diagnose_etc"
              name="diagnose_etc"
              value={formData.diagnose_etc}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="comment" className="font-semibold">
              Comments:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              rows={3}
            />
          </div>
        

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
